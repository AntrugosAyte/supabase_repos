const { SupabaseFilterRPCCall, SupabaseVectorStore } = require("@langchain/community/vectorstores/supabase");
const { BedrockEmbeddings } = require("@langchain/community/embeddings/bedrock");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGJ6aGhlYXd4amp2b2p5bW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NDM3NjIsImV4cCI6MjAyMzQxOTc2Mn0.aaISYJqwDQO0C-RrToHTaf4baQ39QktXeUQVmQ0DEYM';
const SUPABASE_PRIVATE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGJ6aGhlYXd4amp2b2p5bW56Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzg0Mzc2MiwiZXhwIjoyMDIzNDE5NzYyfQ.uBCafoKyXx8aVRVDPlDCGFPKB941M6YxR7qZDLKatA8';
const SUPABASE_URL = 'https://bdtbzhheawxjjvojymnz.supabase.co';

let embeddings = new BedrockEmbeddings({
  region: 'us-east-1',
  model: "amazon.titan-embed-text-v1",
  credentials: {
    accessKeyId: "AKIAV4UWAV6VN3TAZQEQ",
    secretAccessKey: "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",
  },
});

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const supabaseVectorStore = new SupabaseVectorStore(
  embeddings,
  {
    client: supabaseClient,
    tableName: "documents",
  }
)

const docs = [
  {
    pageContent:
      "This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to expand upon the notion of quantum fluff, a theorectical concept where subatomic particles coalesce to form transient multidimensional spaces. Yet, this abstraction holds no real-world application or comprehensible meaning, reflecting a cosmic puzzle.",
    metadata: { b: 1, c: 10, stuff: "right" },
  },
  {
    pageContent:
      "This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to proceed by discussing the echo of virtual tweets in the binary corridors of the digital universe. Each tweet, like a pixelated canary, hums in an unseen frequency, a fascinatingly perplexing phenomenon that, while conjuring vivid imagery, lacks any concrete implication or real-world relevance, portraying a paradox of multidimensional spaces in the age of cyber folklore.",
    metadata: { b: 2, c: 9, stuff: "right" },
  },
  { pageContent: "hello", metadata: { b: 1, c: 9, stuff: "right" } },
  { pageContent: "hello", metadata: { b: 1, c: 9, stuff: "wrong" } },
  { pageContent: "hi", metadata: { b: 2, c: 8, stuff: "right" } },
  { pageContent: "bye", metadata: { b: 3, c: 7, stuff: "right" } },
  { pageContent: "what's this", metadata: { b: 4, c: 6, stuff: "right" } },
];

const run = async () => {
  let vectorStore = await SupabaseVectorStore.fromTexts(
    ["Hello world", "Bye bye", "what's this?", "Viejo Arian"],
    [{ id: 2 }, { id: 1 }, { id: 3 }, {id: 4}],
    embeddings,
    {
      client: supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    }
  )

  const resultOne = await vectorStore.similaritySearch("Viejo Arian", 4);
  console.log(resultOne);
}

// run();

const getMetaDataFiltering = async () => {
  const response = await supabaseVectorStore.similaritySearch("Viejo Arian", 1, { id: 4 });
  console.log(response)
}

// getMetaDataFiltering()

const addDocs = async () => {
  await supabaseVectorStore.addDocuments(docs);

  const funcFilterA = (rpc) =>
    rpc
      .filter("metadata->b::int", "lt", 3)
      .filter("metadata->c::int", "gt", 7)
      .textSearch("content", `'multidimensional' & 'spaces'`, {
        config: "english",
      });

  const resultA = await supabaseVectorStore.similaritySearch("quantum", 4, funcFilterA);

  const funcFilterB = (rpc) =>{
    return rpc
      .filter("metadata->b::int", "lt", 3)
      .filter("metadata->c::int", "gt", 7)
      .filter("metadata->>stuff", "eq", "right");
  }
  const resultB = await supabaseVectorStore.similaritySearch("hello", 2, funcFilterB);
  console.log(resultA, resultB);
}

// addDocs();

const getMarginalSearch = async () => {
  const resultOne = await supabaseVectorStore.maxMarginalRelevanceSearch(
    "Hello world",
    { k: 1 }
  );

  console.log(resultOne);
}

// getMarginalSearch();

const deleteDocuments = async () => {
  const docs = [
    { pageContent: "hello", metadata: { b: 1, c: 9, stuff: "right" } },
    { pageContent: "hello", metadata: { b: 1, c: 9, stuff: "wrong" } },
  ];

  // Also takes an additional {ids: []} parameter for upsertion
  // const ids = await supabaseVectorStore.addDocuments(docs);
  const ids = await supabaseVectorStore.similaritySearch("what's this", 3, {
    "b": 4,
    "c": 6,
    "stuff": "right"
  });
  console.log(ids);

  await supabaseVectorStore.delete({ ids });
  // const resultB = await supabaseVectorStore.similaritySearch("what's this", 3);
  // console.log(resultB);
}

deleteDocuments();