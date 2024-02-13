const { SupabaseVectorStore } = require("@langchain/community/vectorstores/supabase");
const { BedrockEmbeddings } = require("@langchain/community/embeddings/bedrock");
const { createClient } = require("@supabase/supabase-js");

const privateKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dmVzbXRncGd2cm1idndla3d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzc1NDkwNCwiZXhwIjoyMDIzMzMwOTA0fQ.FD_fJppcKjSymfv3MAu31mlo74_S20I-YDXC4gEcmCE';
const url = 'https://suvesmtgpgvrmbvwekwv.supabase.co';


let embeddings = new BedrockEmbeddings({
  region: 'us-east-1',
  model: "amazon.titan-embed-text-v1"
});

const client = createClient(url, privateKey);


const vectorStore = new SupabaseVectorStore(
  embeddings,
  {
    client: client,
    tableName: "documents",
    queryName: "match_documents",
  }
);

async function indexDocuments () {
  const vectorStoreData = await vectorStore.fromTexts(
    ["Hello world", "Bye bye", "What's this?"],
    [{ id: 2 }, { id: 1 }, { id: 3 }],
  );
  console.info(vectorStoreData);
};

indexDocuments();


// const run = async () => {
//   const resultOne = await vectorStore.similaritySearch("Hello world", 1);
//   console.log(resultOne);
// }

// console.log(run)