import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "../aws/s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertToAscii } from "../utils";
import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  metadata: {
    loc: { pageNumber: number };
  };
  pageContent: string;
};

export async function loadS3IntoPinecone(filekey: string) {
  //1. obtain pdf from s3
  const filename = await downloadFromS3(filekey);
  if (!filename) {
    throw new Error("Could not load file from S3");
  }
  const loader = new PDFLoader(filename);
  const pages = (await loader.load()) as PDFPage[];

  //split and segment the padf pages
  const docs = await Promise.all(pages.map(prepareDocument));

  //vectorize and embed individual docs
  const vectors = await Promise.all(docs.flat().map(embedDocument));

  //upload to pinecone
  const pineconeClient = getPineconeClient();
  const pineconeIndx = pineconeClient.Index("doc-sensei");
  const namespace = pineconeIndx.namespace(convertToAscii(filekey));
  console.log("inserting vectors into pinecone");
  await namespace.upsert(vectors);

  return docs[0];
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent.replace(/\n/g, "");
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}

async function embedDocument(doc: Document) {
  try {
    const embeds = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeds,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}
