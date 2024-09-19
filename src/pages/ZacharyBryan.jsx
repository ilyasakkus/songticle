import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const ZacharyBryan = () => {
  const songs = [
    {
      title: "Something in the Orange",
      year: 2022,
      description: "\"Something in the Orange,\" a song penned and performed by American singer Zach Bryan, holds a significant place as the second single from his third studio album, \"American Heartbreak,\" released on April 22, 2022. Produced by Ryan Hadlock at Bear Creek Studio, the track captures Bryan's emotive storytelling and musical finesse. Notably, a more raw rendition titled \"Z&E's version\" was later produced by Eddie Spear, showcasing an alternative take on the song. This dual production approach speaks to the depth and versatility of Bryan's artistry.",
      youtubeEmbed: "lA8F9sIhGdg"
    },
    {
      title: "Heading South",
      year: 2019,
      description: "\"Heading South\" by American singer-songwriter Zach Bryan is a compelling track that gained significant attention after its release on September 30, 2019, as a single from his second studio album, \"Elisabeth,\" which came out on May 8, 2020. The song, written by Bryan and produced by Leo Alba, took on a new life in 2020 when it gained remarkable traction on the internet, accumulating over 30 million plays on Spotify. Bryan's personal touch to the recording is noteworthy, as he shared that he recorded the song behind his barracks during his service in the United States Navy.",
      youtubeEmbed: "d9bmS1UkFBs"
    },
    {
      title: "Burn, Burn, Burn",
      year: 2023,
      description: "\"Burn, Burn, Burn\" by Zach Bryan unfolds as a beautiful poem, articulating a profound yearning for a life detached from the clamor and conformity of society. Released unexpectedly on September 8, the song is underscored by Bryan's admiration for beatnik author Jack Kerouac, evident in his Instagram caption referencing his favorite Kerouac line. This connection to Kerouac, a figure synonymous with counterculture poetry, adds depth to the song's thematic exploration. The title's repetition, echoing Kerouac's \"burn, burn, burn\" from \"On the Road,\" evokes a sense of urgency and desire for liberation.",
      youtubeEmbed: "B3iORE_4eao"
    },
    {
      title: "I Remember Everything",
      year: 2023,
      description: "\"I Remember Everything\" stands out as a significant collaboration between American singer Zach Bryan and country music artist Kacey Musgraves, featured on Bryan's fourth studio album released on August 25, 2023. Serving as the lead single from the album, the song quickly garnered attention, making its mark by debuting at the coveted number one position on the US Billboard Hot 100. This achievement marked a milestone for both Bryan and Musgraves, representing their first number-one song.",
      youtubeEmbed: "ZVVvJjwzl6c"
    },
    {
      title: "Oklahoma Smokeshow",
      year: 2022,
      description: "\"Oklahoma Smokeshow\" by Zach Bryan delves into the theme of small-town confinement and the repercussions of unrealized aspirations. The song unfolds a narrative of a young woman caught in the stifling embrace of a small hometown, constrained by societal expectations. The lyrics vividly depict her adorned appearance, hinting at a desire for something more, a longing for escape. However, the narrative takes a poignant turn as the only apparent exit is through a relationship with a man who proves detrimental.",
      youtubeEmbed: "FJqd58_WgGo"
    },
    {
      title: "Someday On My Mind",
      year: 2023,
      description: "\"Someday On My Mind\" by Zach Bryan unfolds as a poignant reflection on the yearning for a brighter future and the recognition that true happiness may lie in the present. The song navigates the singer's desire to escape to a place of significance, symbolized by the \"heavenly highway hymns,\" hinting at a tranquil and idyllic countryside. The lyrics beautifully capture a sense of nostalgia, weaving in bittersweet memories of past relationships and yearning for better times.",
      youtubeEmbed: "2QcVWvAU4tI"
    },
    {
      title: "Sun to Me",
      year: 2022,
      description: "\"Sun to Me\" by Zach Bryan emerges as a tender and introspective narrative, weaving a story of love and personal evolution. The song beautifully captures the essence of finding a person who becomes a beacon of light, much like the sun, illuminating even the darkest corners of one's life. This heartfelt composition revolves around a significant other or perhaps a close friend, serving as a tribute to their profound impact. It reflects on the transformative nature of the relationship, highlighting the partner's ability to see the best in Zach even during challenging times.",
      youtubeEmbed: "-s5-VXG7Qio"
    },
    {
      title: "Mine Again",
      year: 2005,
      description: "\"Mine Again\" stands as a captivating ballad from Mariah Carey's tenth studio album, \"The Emancipation of Mimi\" (2005). Co-written and co-produced by Carey and James Poyser, the song is a soulful R&B composition that delves into the theme of longing for a second chance in a relationship that appears to have faltered. Recorded in New York City at MSR Studios and Honeywest Studios, the track showcases Carey's exceptional vocal prowess and the seamless collaboration between the artists in both writing and production. The song received positive reviews from music critics who lauded Carey and Poyser's work, highlighting the emotional depth and sincerity in Carey's performance. Although \"Mine Again\" entered the US Hot R&B/Hip-Hop Songs chart at number 82, its impact transcends chart positions, earning a Grammy nomination for Best Traditional R&B Performance in 2006. This ballad stands as a testament to Mariah Carey's enduring ability to craft emotionally resonant music that connects with listeners on a profound level.",
      youtubeEmbed: "YfibXIeB-c4"
    },
    {
      title: "From Austin",
      year: 2022,
      description: "\"From Austin\" by Zach Bryan is a heartfelt musical journey that encapsulates the complex emotions of departing from a relationship that has reached its breaking point. This poignant ballad narrates the protagonist's departure from Austin, a symbolic backdrop for the dissolution of a love that couldn't withstand the challenges it faced. The song delves into the protagonist's internal struggle, expressing a yearning to leave with their partner while confronting the painful reality that personal healing is necessary.",
      youtubeEmbed: "trrHTp7wp9c"
    },
    {
      title: "The Good I'll Do",
      year: 2022,
      description: "\"The Good I'll Do,\" a poignant ballad featured on Zach Bryan's breakthrough 2022 album, \"American Heartbreak,\" stands out as a powerful testament to the singer-songwriter's emotional depth and storytelling prowess. In just three years since his debut album \"DeAnn,\" Bryan has demonstrated remarkable growth in his craft. This particular track captures the essence of heartache and self-reflection, showcasing Bryan's ability to convey raw and genuine emotions through his music. The song, likely a centerpiece of his impressive collection, delves into themes of love, loss, and the introspective journey of coming to terms with one's own actions. With Bryan's soulful voice and evocative lyrics, \"The Good I'll Do\" not only resonates with listeners but also solidifies his standing as a rising star in the country music scene.",
      youtubeEmbed: "O48DxQwQo5Q"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main Page
          </Link>
          <h1 className="text-4xl font-bold mb-4">Zachary Lane Bryan</h1>
          <p className="text-xl mb-8">
            Zachary Lane Bryan, born on April 2, 1996, has emerged as a notable figure in the American country music scene. Hailing from Oologah, Oklahoma, Bryan made a significant impact with his major-label debut album, "American Heartbreak," which entered the U.S. Billboard 200 at an impressive number five. However, it was his self-titled album released in 2023 that truly catapulted him to stardom, debuting at the number one spot on the US Billboard 200. The album featured the chart-topping track "I Remember Everything," a collaboration with the talented Kacey Musgraves, which also secured the number one position on the US Billboard Hot 100. Bryan's achievements extend beyond chart success, as he has garnered numerous accolades, including four Grammy Award nominations and fourteen Billboard Music Award nominations. With his soulful voice and compelling songwriting, Zachary Lane Bryan has undoubtedly solidified his presence in the contemporary country music landscape.
          </p>
          <h2 className="text-3xl font-semibold mb-6">Top 10 Songs</h2>
          <div className="space-y-8">
            {songs.map((song, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. {song.title} ({song.year})
                </h3>
                <p className="text-gray-600 mb-4">{song.description}</p>
                <div className="aspect-w-16 aspect-h-9" style={{ height: '480px' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${song.youtubeEmbed}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ZacharyBryan;