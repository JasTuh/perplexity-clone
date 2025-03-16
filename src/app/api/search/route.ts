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

    // const searchResponse = {
    //     search_metadata: {
    //       id: '67d70e8e7284392ccd1262ef',
    //       status: 'Success',
    //       json_endpoint: 'https://serpapi.com/searches/00eacf030f2dc93e/67d70e8e7284392ccd1262ef.json',
    //       created_at: '2025-03-16 17:46:54 UTC',
    //       processed_at: '2025-03-16 17:46:54 UTC',
    //       google_url: 'https://www.google.com/search?q=hello&oq=hello&uule=w+CAIQICINVW5pdGVkIFN0YXRlcw&num=5&sourceid=chrome&ie=UTF-8',
    //       raw_html_file: 'https://serpapi.com/searches/00eacf030f2dc93e/67d70e8e7284392ccd1262ef.html',
    //       total_time_taken: 1.01
    //     },
    //     search_parameters: {
    //       engine: 'google',
    //       q: 'hello',
    //       location_requested: 'United States',
    //       location_used: 'United States',
    //       google_domain: 'google.com',
    //       num: '5',
    //       device: 'desktop'
    //     },
    //     search_information: {
    //       query_displayed: 'hello',
    //       total_results: 6530000000,
    //       time_taken_displayed: 0.29,
    //       organic_results_state: 'Results for exact spelling'
    //     },
    //     knowledge_graph: {
    //       title: 'Hello',
    //       type: 'Song by Adele ‧ 2015',
    //       entity_type: 'video_universal',
    //       kgmid: '/g/11bwnh780b',
    //       knowledge_graph_search_link: 'https://www.google.com/search?kgmid=/g/11bwnh780b&hl=en-US&q=Hello',
    //       serpapi_knowledge_graph_search_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&hl=en-US&kgmid=%2Fg%2F11bwnh780b&location=United+States&num=5&q=Hello',
    //       released: '2015',
    //       artist: 'Adele',
    //       artist_links: [ [Object] ],
    //       album: '25',
    //       album_links: [ [Object] ],
    //       genres: 'Soul music, Alternative/Indie, Pop',
    //       genres_links: [ [Object], [Object], [Object] ],
    //       web_results: [ [Object] ]
    //     },
    //     inline_images: [
    //       {
    //         source: 'https://www.youtube.com/watch?v=tVlcKp3bWH8',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/ba484c971ac3b6bf4d7ee3a9f5ca180f8a035cc803632994b70e8cb2c56638a6.jpeg',
    //         original: 'https://i.ytimg.com/vi/tVlcKp3bWH8/maxresdefault.jpg',
    //         title: 'Hello! | Kids Greeting Song and Feelings Song | Super Simple Songs',
    //         source_name: 'YouTube'
    //       },
    //       {
    //         source: 'https://basicappleguy.com/basicappleblog/hello-20',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/ba484c971ac3b6bf927e36b119c29682e49773fb683d684d30e2af2280e738a5.jpeg',
    //         original: 'https://basicappleguy.com/s/HelloLight_Mac.png',
    //         title: 'hello 2.0 — Basic Apple Guy',
    //         source_name: 'Basic Apple Guy'
    //       },
    //       {
    //         source: 'https://developer.apple.com/hello/',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/ba484c971ac3b6bf0f183e7ba715d37470dede5032e22605722d9780aa9d8776.jpeg',
    //         original: 'https://developer.apple.com/hello/images/june24-hello-hero_2x.jpeg',
    //         title: 'Hello - Apple Developer',
    //         source_name: 'Apple Developer'
    //       },
    //       {
    //         source: 'https://www.etsy.com/listing/1215176242/hello-svg-hello-png-hellow-dxf-hello-cut',
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMeQvG1kqLLURbt3gp_B8nCs0Z7yalFkGz_gSSrxOeT5vmRy3W2TGbvB0&s',
    //         original: 'https://i.etsystatic.com/29488153/r/il/e0f22b/3860244894/il_fullxfull.3860244894_p9az.jpg',
    //         title: 'Hello SVG, Hello PNG, Hellow DXF , Hello Cut File, Hand Lettered Hello,  Calligraphy Hello, Hello Clipart',
    //         source_name: 'Etsy'
    //       },
    //       {
    //         source: 'https://www.vecteezy.com/vector-art/25894618-cute-word-hello-cartoon-style-vector-illustration',
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RhRtog2LUhKNCbX0UzEXO5Rrd0DAZ6eNyVd5aZcedYlrKXanVSoCp48&s',
    //         original: 'https://static.vecteezy.com/system/resources/previews/025/894/618/non_2x/cute-word-hello-cartoon-style-illustration-vector.jpg',
    //         title: "Cute word 'Hello' Cartoon style, Vector illustration ...",
    //         source_name: 'Vecteezy'
    //       },
    //       {
    //         source: 'https://goodgirlgel.store/collections/hello',
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMwTbmA8iGPO8fnNZ15M0W8zyh3e4c0ZZRHhhvVQtfLwarGwt9zlrgLM&s',
    //         original: 'https://goodgirlgel.store/cdn/shop/collections/IMG_0458.jpg?v=1721159221&width=750',
    //         title: 'HELLO Nail Brand – Good Girl Gel',
    //         source_name: 'Good Girl Gel'
    //       },
    //       {
    //         source: 'https://www.vectorstock.com/royalty-free-vector/hello-cute-card-vector-21608233',
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDOz9mqweiVF4r0jSjEvHVfjx_yANAzBr4YCNuSzsYMkVrQmmA24nsRmg&s',
    //         original: 'https://cdn.vectorstock.com/i/1000v/82/33/hello-cute-card-vector-21608233.jpg',
    //         title: 'Hello cute card Royalty Free Vector Image - VectorStock',
    //         source_name: 'VectorStock'
    //       },
    //       {
    //         source: 'https://unsplash.com/s/photos/hello',
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhJE7d8Aw_3bsGj4My18dpp0HSULm-lbhWbWh8CGaCtflBpKUzBEUGYs&s',
    //         original: 'https://plus.unsplash.com/premium_photo-1687203673190-d39c3719123a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVsbG98ZW58MHx8MHx8fDA%3D',
    //         title: '500+ Hello Pictures | Download Free Images on Unsplash',
    //         source_name: 'Unsplash'
    //       },
    //       {
    //         source: 'https://en.ac-illust.com/clip-art/24553903/hello-hello',
    //         thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPVSuP8uVZ1W2rd8KvgJ_gRevwr80cCjAy5ok4cEV-4SzD4r_p_f8_xs&s',
    //         original: 'https://thumb.ac-illust.com/e2/e2cbae08aee6ed3c5fa742b33e936831_t.jpeg',
    //         title: 'Free Vectors | Hello Hello',
    //         source_name: 'illustAC'
    //       }
    //     ],
    //     inline_videos: [
    //       {
    //         position: 1,
    //         title: 'Adele - Hello (Official Music Video)',
    //         link: 'https://www.youtube.com/watch?v=YQHsXMglC9A',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/e93c513e9c8f95db7675b41202abf475ae8b028a35484715e9fbd0886aeea595.jpeg',
    //         channel: 'AdeleVEVO',
    //         duration: '6:07',
    //         platform: 'YouTube',
    //         date: 'Oct 23, 2015'
    //       },
    //       {
    //         position: 2,
    //         title: 'Hello',
    //         link: 'https://www.youtube.com/watch?v=yjo_aXygRDI',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/e93c513e9c8f95dbd53bff0b4497320e3ca9cd1c3a902e56fd0bffa8390d7008.jpeg',
    //         channel: 'Adele - Topic',
    //         duration: '4:56',
    //         platform: 'YouTube',
    //         date: 'Dec 15, 2020'
    //       },
    //       {
    //         position: 3,
    //         title: 'Adele - Hello (Live at the NRJ Awards)',
    //         link: 'https://www.youtube.com/watch?v=DfG6VKnjrVw',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/e93c513e9c8f95db5abcabb31521c1af5e20c59edb1751245e5bd9ced5e49dbb.jpeg',
    //         channel: 'AdeleVEVO',
    //         duration: '5:08',
    //         platform: 'YouTube',
    //         date: 'Nov 9, 2015'
    //       },
    //       {
    //         position: 4,
    //         title: 'YUNGBLUD - Hello Heaven, Hello',
    //         link: 'https://www.youtube.com/watch?v=xrZX47RbeJs',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/e93c513e9c8f95db615be8bd675a4e1b60bc3609ffbe1c4fd1c62c5a26610c21.jpeg',
    //         channel: 'YUNGBLUDVEVO',
    //         platform: 'YouTube',
    //         date: '1 day ago'
    //       }
    //     ],
    //     answer_box: {
    //       type: 'song',
    //       lyrics: "Hello, it's me\n" +
    //         "I was wondering if after all these years you'd like to meet\n" +
    //         'To go over everything\n' +
    //         "They say that time's supposed to heal ya, but I ain't done much healing...",
    //       artist: 'Adele',
    //       source: 'Musixmatch',
    //       song: 'Hello',
    //       album: '25',
    //       released: '2015',
    //       genres: 'Soul music, Alternative/Indie, Pop',
    //       video: {
    //         title: 'Adele - Hello (Official Music Video)',
    //         link: 'https://www.youtube.com/watch?v=YQHsXMglC9A',
    //         duration: '6:07',
    //         source: 'YouTube',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/b96d752899283c7ebe909edd533a981921a9f40f7241284635c469f1c4675ec7.jpeg'
    //       }
    //     },
    //     organic_results: [
    //       {
    //         position: 1,
    //         title: 'Hello Products',
    //         link: 'https://www.hello-products.com/?srsltid=AfmBOoq1pNKqnhszzt4eYw1xBuq0Dmn7ZsUKLduOOHJ2Ix5sKABsohOz',
    //         redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.hello-products.com/%3Fsrsltid%3DAfmBOoq1pNKqnhszzt4eYw1xBuq0Dmn7ZsUKLduOOHJ2Ix5sKABsohOz&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQFnoECEkQAQ',
    //         displayed_link: 'https://www.hello-products.com',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/bf918fae3498f37b3275e1fca136d08dcc2e4db67b234909783eacb3bd7c3c61.jpeg',
    //         favicon: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/bf918fae3498f37b3275e1fca136d08d50f2264fc2f362250fb8dd862416d4cb.png',
    //         snippet: "A fresh take on oral care that's all about the good vibes. We're the ones, mixing up delightful ingredients that'll have you doing a happy dance.",
    //         snippet_highlighted_words: [Array],
    //         source: 'Hello Products'
    //       },
    //       {
    //         position: 2,
    //         title: 'HELLO! US Edition - Latest news and Photos',
    //         link: 'https://www.hellomagazine.com/us/',
    //         redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.hellomagazine.com/us/&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQFnoECFAQAQ',
    //         displayed_link: 'https://www.hellomagazine.com › ...',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/bf918fae3498f37b3275e1fca136d08d25abef5bbfbb7a6d14a08ab4b20011b8.jpeg',
    //         favicon: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/bf918fae3498f37b3275e1fca136d08d074f30ac9ead9123576a4f2b82015060.png',
    //         snippet: 'HELLO! US edition brings you the latest celebrity & royal news from the US & around the world, magazine exclusives, celeb babies, weddings, pregnancies and ...',
    //         snippet_highlighted_words: [Array],
    //         sitelinks: [Object],
    //         source: 'hellomagazine.com'
    //       },
    //       {
    //         position: 3,
    //         title: 'Hello (Adele song)',
    //         link: 'https://en.wikipedia.org/wiki/Hello_(Adele_song)',
    //         redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://en.wikipedia.org/wiki/Hello_(Adele_song)&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQFnoECEgQAQ',
    //         displayed_link: 'https://en.wikipedia.org › wiki › Hello_(Adele_song)',
    //         thumbnail: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/bf918fae3498f37b3275e1fca136d08dfe79add279c4f95a98ebd93d5763b81a.jpeg',
    //         favicon: 'https://serpapi.com/searches/67d70e8e7284392ccd1262ef/images/bf918fae3498f37b3275e1fca136d08dd6759c1c1ee9c008db412a34b74412c4.png',
    //         snippet: '"Hello" is a song recorded by English singer-songwriter Adele, released on 23 October 2015 by XL Recordings as the lead single from her third studio album, ...',
    //         snippet_highlighted_words: [Array],
    //         source: 'Wikipedia'
    //       }
    //     ],
    //     top_stories_link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=hello&udm=2&source=univ&fir=HA_IwI6Tbyo0dM%252C94CtclSt6HrnJM%252C_%253BwYUVME2ids7u2M%252C8sYvKww12TUJ7M%252C_%253BxaZyB-UdrGb_2M%252CEMLO2j70XY-8YM%252C_%253BbOHyA7cTVVN9oM%252C7I_kbDECEAko6M%252C_%253Bc1XKjPS6HUFRIM%252C09H3hKxsvSU0HM%252C_%253BpRz5hfv8GL6-2M%252CCaNlbLJirF1z8M%252C_%253BNLPV-IAPCwdrQM%252C-GpoUYYDe_5sxM%252C_%253B0JiMwmLS-vvFcM%252CtP57eO09A3UgzM%252C_%253BgzV4lTXwN3b4JM%252Ca7m3bLca0FC6nM%252C_&usg=AI4_-kRS3Xtvq7xdG5JepFP9OpHiq8jCyA&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ7Al6BAgeEAY',
    //     top_stories_serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello',
    //     related_searches: [
    //       {
    //         block_position: 1,
    //         query: 'Hello Song',
    //         link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=Hello+Song&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ1QJ6BAhHEAE',
    //         serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=Hello+Song'
    //       },
    //       {
    //         block_position: 1,
    //         query: 'Hello Google',
    //         link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=Hello+Google&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ1QJ6BAhGEAE',
    //         serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=Hello+Google'
    //       },
    //       {
    //         block_position: 1,
    //         query: 'Hello Hi',
    //         link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=Hello+Hi&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ1QJ6BAhFEAE',
    //         serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=Hello+Hi'
    //       },
    //       {
    //         block_position: 1,
    //         query: 'Adele Hello',
    //         link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=Adele+Hello&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ1QJ6BAhEEAE',
    //         serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=Adele+Hello'
    //       },
    //       {
    //         block_position: 1,
    //         query: 'Hello pronunciation',
    //         link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=Hello+pronunciation&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ1QJ6BAhCEAE',
    //         serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=Hello+pronunciation'
    //       },
    //       {
    //         block_position: 1,
    //         query: 'Hello Movie',
    //         link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=Hello+Movie&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ1QJ6BAhDEAE',
    //         serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=Hello+Movie'
    //       },
    //       {
    //         block_position: 1,
    //         query: 'Hello meaning in Hindi',
    //         link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=Hello+meaning+in+Hindi&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ1QJ6BAhBEAE',
    //         serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=Hello+meaning+in+Hindi'
    //       },
    //       {
    //         block_position: 1,
    //         query: 'Hello Mobile',
    //         link: 'https://www.google.com/search?num=5&sca_esv=56d1678c3766929b&q=Hello+Mobile&sa=X&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ1QJ6BAhAEAE',
    //         serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=Hello+Mobile'
    //       }
    //     ],
    //     pagination: {
    //       current: 1,
    //       next: 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=5&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8NMDegQIDxAW',
    //       other_pages: {
    //         '2': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=5&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAE',
    //         '3': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=10&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAG',
    //         '4': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=15&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAI',
    //         '5': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=20&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAK',
    //         '6': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=25&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAM',
    //         '7': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=30&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAO',
    //         '8': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=35&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAQ',
    //         '9': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=40&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAS',
    //         '10': 'https://www.google.com/search?q=hello&num=5&sca_esv=56d1678c3766929b&ei=jw7XZ5OiGveE0PEPhqfp2AQ&start=45&sa=N&sstk=Af40H4XUNXJU3jrNbnjgR7RBRfXIEiAVwGLNV7VpUC5RG2GJwvqT8NZoai2jBiaBXPWxR8FPD2WqHm9xcMDbR_5OMin5PbB3f7mmqA&ved=2ahUKEwjTpbCPlI-MAxV3AjQIHYZTGksQ8tMDegQIDxAU'
    //       }
    //     },
    //     serpapi_pagination: {
    //       current: 1,
    //       next_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=5',
    //       next: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=5',
    //       other_pages: {
    //         '2': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=5',
    //         '3': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=10',
    //         '4': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=15',
    //         '5': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=20',
    //         '6': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=25',
    //         '7': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=30',
    //         '8': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=35',
    //         '9': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=40',
    //         '10': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=United+States&num=5&q=hello&start=45'
    //       }
    //     }
    //   }
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