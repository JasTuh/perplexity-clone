import { NextResponse } from "next/server";
import { getJson } from "serpapi";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) return NextResponse.json({ error: "Query is required" }, { status: 400 });

    const searchResponse = await getJson({
      engine: "google",
      api_key: process.env.SERP_API_KEY,
      q: query,
      num: 5,
      location: "United States",
    });

    const searchResults = searchResponse.organic_results.map((result: any) => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet,
    }));

    const aiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "Summarize the following search results as a detailed answer, citing sources." },
          { role: "user", content: JSON.stringify(searchResults) },
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    return NextResponse.json({
      searchResults,
      aiSummary: aiResponse.data.choices[0].message.content,
    });

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}