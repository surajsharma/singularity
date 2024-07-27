import { getEmbedding, EmbeddingIndex } from 'client-vector-search';

// getEmbedding is an async function, so you need to use 'await' or '.then()' to get the result
const embedding = await getEmbedding("Apple"); // Returns embedding as number[]

// Each object should have an 'embedding' property of type number[]
const initialObjects = [
    { id: 1, name: "Apple", embedding: embedding },
    { id: 2, name: "Banana", embedding: await getEmbedding("Banana") },
    { id: 3, name: "Cheddar", embedding: await getEmbedding("Cheddar") },
    { id: 4, name: "Space", embedding: await getEmbedding("Space") },
    { id: 5, name: "database", embedding: await getEmbedding("database") },
];
const index = new EmbeddingIndex(initialObjects); // Creates an index

// The query should be an embedding of type number[]
const queryEmbedding = await getEmbedding('dairy'); // Query embedding
const results = await index.search(queryEmbedding, { topK: 5 }); // Returns top similar objects

console.log(JSON.stringify(index));