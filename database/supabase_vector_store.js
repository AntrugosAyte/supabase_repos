const { SupabaseVectorStore } = require("@langchain/community/vectorstores/supabase");
const { BedrockEmbeddings } = require("@langchain/community/embeddings/bedrock");
const { createClient } = require("@supabase/supabase-js");


const annonkeyClient = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dmVzbXRncGd2cm1idndla3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NTQ5MDQsImV4cCI6MjAyMzMzMDkwNH0.KYPB4G4-23fyzD0hBApmBnoeNjMRZSf6m1MRXrd4dhQ';

const supabaseUrl = 'https://suvesmtgpgvrmbvwekwv.supabase.co';
const supabase = createClient(supabaseUrl, annonkeyClient);

async function getDataSupabase() {
    const { data, error } = await supabase.from('countries').select()
    console.log(data);
}

getDataSupabase();

// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbG1wcWd0dmRpY3N4c2theXJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzc3MjkxMSwiZXhwIjoyMDIzMzQ4OTExfQ.B0txI-nVmg9pg59CQYIpZHg5sPUM2_XWc7Mf8aAi4z4';
// First, follow set-up instructions at
// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase

// const privateKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbG1wcWd0dmRpY3N4c2theXJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzc3MjkxMSwiZXhwIjoyMDIzMzQ4OTExfQ.B0txI-nVmg9pg59CQYIpZHg5sPUM2_XWc7Mf8aAi4z4';
// if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

// const url = 'https://tslmpqgtvdicsxskayrd.supabase.co';
// if (!url) throw new Error(`Expected env var SUPABASE_URL`);

// let embeddings = new BedrockEmbeddings({
//     region: 'us-east-1',
//     model: "amazon.titan-embed-text-v1"
//   });

// const run = async () => {
//   const client = createClient(url, privateKey);

//   const vectorStore = await SupabaseVectorStore.fromTexts(
//     ["Hello world", "Bye bye", "What's this?"],
//     [{ id: 2 }, { id: 1 }, { id: 3 }],
//     embeddings,
//     {
//       client,
//       tableName: "documents",
//       queryName: "match_documents",
//     }
//   );

//   const resultOne = await vectorStore.similaritySearch("Hello world", 1);

//   console.log(resultOne);
// };

// run();