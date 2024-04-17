import { OpenAI } from "openai";


const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });

    console.log(response)
    return response.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling OpenAI embeddings API", error);
    throw error;
  }
}
