const { SupabaseFilterRPCCall, SupabaseVectorStore } = require("@langchain/community/vectorstores/supabase");
const { BedrockEmbeddings } = require("@langchain/community/embeddings/bedrock");
const { createClient } = require("@supabase/supabase-js");

// const annonkeyClient = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dmVzbXRncGd2cm1idndla3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NTQ5MDQsImV4cCI6MjAyMzMzMDkwNH0.KYPB4G4-23fyzD0hBApmBnoeNjMRZSf6m1MRXrd4dhQ';

// const supabaseUrl = 'https://suvesmtgpgvrmbvwekwv.supabase.co';
// const supabase = createClient(supabaseUrl, annonkeyClient);

// async function getDataSupabase() {
//     const { data, error } = await supabase.from('countries').select()
//     console.log(data);
// }

// getDataSupabase();


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dmVzbXRncGd2cm1idndla3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NTQ5MDQsImV4cCI6MjAyMzMzMDkwNH0.KYPB4G4-23fyzD0hBApmBnoeNjMRZSf6m1MRXrd4dhQ';
const SUPABASE_PRIVATE_KEY = 'x+Ts3FNX80fnfQbiZ6QcDI8FxB2JPsbf53M+4NC6lQec0fEM7yvYQv284dKKhV9jF59b3xJic9ACuG/JhuPpHQ==';
const SUPABASE_URL = 'https://suvesmtgpgvrmbvwekwv.supabase.co';

let embeddings = new BedrockEmbeddings({
  region: 'us-east-1',
  model: "amazon.titan-embed-text-v1",
  credentials: {
    accessKeyId: "AKIAV4UWAV6VN3TAZQEQ",
    secretAccessKey: "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",
  },
});

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const run = async () => {
  let vectorStore = await SupabaseVectorStore.fromTexts(
    ["Hello world", "Bye bye", "what's this?"],
    [{ id: 2 }, { id: 1 }, { id: 3 }],
    embeddings,
    {
      client: supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    }
  )

  const resultOne = await vectorStore.similaritySearch("Hello world", 1);

  console.log(resultOne);
}

run()


// const indexDocuments = async (documents) => {
//   const vectorStoreData = await supabaseVectorStore.addDocuments(documents);
//   console.info(vectorStoreData);
// };

// indexDocuments;

// async function getDocumentsWithSimilarytySearch () {
//   const response = await supabaseVectorStore.similaritySearch("bigO", 1);
//   console.info(response);
// };
// getDocumentsWithSimilarytySearch;

// async function getVectorStoreAsRetreiver() {
//   return supabaseVectorStore.asRetriever();
// };
// getVectorStoreAsRetreiver();

// const run = async () => {
//   const client = createClient(url, privateKey);
  
//   console.log(client);
  
  
//   console.log(vectorStore);
//   // const resultOne = await vectorStore.similaritySearch("Hello world", 1);
  
// };

// run();
// const docs = [
//   {
//     pageContent:
//       "This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to expand upon the notion of quantum fluff, a theorectical concept where subatomic particles coalesce to form transient multidimensional spaces. Yet, this abstraction holds no real-world application or comprehensible meaning, reflecting a cosmic puzzle.",
//     metadata: { b: 1, c: 10, stuff: "right" },
//   },
//   {
//     pageContent:
//       "This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to proceed by discussing the echo of virtual tweets in the binary corridors of the digital universe. Each tweet, like a pixelated canary, hums in an unseen frequency, a fascinatingly perplexing phenomenon that, while conjuring vivid imagery, lacks any concrete implication or real-world relevance, portraying a paradox of multidimensional spaces in the age of cyber folklore.",
//     metadata: { b: 2, c: 9, stuff: "right" },
//   },
//   { pageContent: "hello", metadata: { b: 1, c: 9, stuff: "right" } },
//   { pageContent: "hello", metadata: { b: 1, c: 9, stuff: "wrong" } },
//   { pageContent: "hi", metadata: { b: 2, c: 8, stuff: "right" } },
//   { pageContent: "bye", metadata: { b: 3, c: 7, stuff: "right" } },
//   { pageContent: "what's this", metadata: { b: 4, c: 6, stuff: "right" } },
// ];


// const run = async () => {
//   await supabaseVectorStore.addDocuments(docs);

//   const funcFilterA: SupabaseFilterRPCCall = (rpc) =>
//     rpc
//       .filter("metadata->b::int", "lt", 3)
//       .filter("metadata->c::int", "gt", 7)
//       .textSearch("content", `'multidimensional' & 'spaces'`, {
//         config: "english",
//       });

//   const resultA = await store.similaritySearch("quantum", 4, funcFilterA);

//   const funcFilterB: SupabaseFilterRPCCall = (rpc) =>
//     rpc
//       .filter("metadata->b::int", "lt", 3)
//       .filter("metadata->c::int", "gt", 7)
//       .filter("metadata->>stuff", "eq", "right");

//   const resultB = await store.similaritySearch("hello", 2, funcFilterB);

//   console.log(resultA, resultB);
// }