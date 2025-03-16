import { NextResponse } from "next/server";
import { getJson } from "serpapi";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) return NextResponse.json({ error: "Query is required" }, { status: 400 });

    const testing = true
    const apiKey = testing ? "" : process.env.SERP_API_KEY;
    console.log({
        engine: "google",
        api_key: apiKey,
        q: query,
        location: "United States",
    })

    const response = await getJson({
      engine: "google",
      api_key: apiKey,
      q: query,
      location: "United States",
    });

    return NextResponse.json({ results: response.organic_results });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}