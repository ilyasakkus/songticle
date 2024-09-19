import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const BillieHoliday = () => {
  const songs = [
    {
      title: "Solitude",
      year: 1934,
      description: "\"(In My) Solitude\" is a soul-stirring jazz composition by the legendary Duke Ellington, featuring lyrics crafted by Eddie DeLange and Irving Mills in 1934. Revered as a jazz standard, the song has seen numerous renditions over the years. Billie Holiday, the iconic jazz vocalist, lent her emotive prowess to the song, recording it multiple times in the 1940s and 1950s. Holiday's interpretations of \"(In My) Solitude\" stand out for their poignant delivery, with the world-weary lyrics resonating profoundly with her late-career persona.",
      youtubeEmbed: "xiU-O8arVa8"
    },
    {
      title: "Gloomy Sunday",
      year: 1936,
      description: "\"Gloomy Sunday\" originated in 1936, first recorded in English by Hal Kemp with lyrics by Sam M. Lewis. The same year saw another rendition by Paul Robeson, featuring lyrics by Desmond Carter. However, the song gained widespread recognition following jazz and swing music singer Billie Holiday's poignant interpretation in 1941. Sam M. Lewis's lyrics, with their melancholic undertones referencing suicide, led to the label dubbing it the \"Hungarian Suicide Song.\"",
      youtubeEmbed: "XQ2AuLaClmk"
    },
    {
      title: "Blue Moon",
      year: 1934,
      description: "\"Blue Moon,\" a classic ballad penned by the prolific songwriting duo Richard Rodgers and Lorenz Hart in 1934, has stood the test of time to become a cherished standard. With its enchanting melody and poetic lyrics, the song quickly found its place in the hearts of music lovers. Early recordings by Connee Boswell and Al Bowlly in 1935 set the stage for the song's enduring popularity. In 1949, \"Blue Moon\" experienced a resurgence, achieving success with renditions by Billy Eckstine and Mel Tormé in the U.S. The song's timeless quality is further accentuated by the soulful interpretation of jazz legend Billie Holiday. Her rendition adds a layer of depth and emotion, turning \"Blue Moon\" into an iconic piece within the rich tapestry of American music.",
      youtubeEmbed: "y4bZu56EylA"
    },
    {
      title: "I'm a Fool to Want You",
      year: 1951,
      description: "The song's enduring appeal is further emphasized by Billie Holiday, who also lent her distinctive voice to this evocative composition. With its exploration of heartache and remorse, \"I'm a Fool to Want You\" stands as a testament to the enduring power of Sinatra's songwriting and storytelling prowess, leaving an indelible mark on the landscape of classic American music.",
      youtubeEmbed: "qA4BXkF8Dfo"
    },
    {
      title: "I'll Be Seeing You",
      year: 1938,
      description: "\"I'll Be Seeing You,\" a poignant and evocative song about longing for a loved one, was born out of the collaborative genius of composer Sammy Fain and lyricist Irving Kahal. Published in 1938, it found its initial placement in the Broadway musical \"Right This Way,\" which, despite a brief run of fifteen performances, introduced the world to this enduring classic. Renowned jazz singer Billie Holiday also lent her unforgettable voice to the song, infusing it with a unique blend of vulnerability and grace. \"I'll Be Seeing You\" remains a quintessential piece in the Great American Songbook, embodying the universal sentiments of love and longing with a haunting beauty that transcends generations.",
      youtubeEmbed: "3C5zYKIuoxg"
    },
    {
      title: "The Very Thought of You",
      year: 1934,
      description: "\"The Very Thought of You,\" a timeless pop standard, was crafted in 1934 with both music and lyrics penned by Ray Noble. The inaugural recording took place with Ray Noble and His Orchestra featuring the vocals of Al Bowlly for HMV in April 1934, later released in the United States by Victor. The rendition achieved remarkable success, reigning at number one on the pop music charts for an impressive five weeks. However, the song found itself entangled in legal complexities in 1962. Ray Noble had initially assigned the copyright to British publisher Campbell, Connelly & Company in 1934. Despite Noble later assigning the U.S. copyright to M. Witmark & Sons, a legal dispute arose, with Campbell, and Connelly arguing that their initial assignment covered all rights, including those in the USA. This song has also been immortalized through Billie Holiday's poignant 1938 recording, further solidifying its status as a cherished and enduring classic.",
      youtubeEmbed: "iiewtK_qPv4"
    },
    {
      title: "Easy Living",
      year: 1937,
      description: "\"Easy Living\" (1937) is a jazz standard that weaves a timeless melody written by Ralph Rainger, complemented by the lyrical finesse of Leo Robin for the film Easy Living. Originally featured as the main theme in the film's score without vocals, it found its vocal embodiment in a popular 1937 recording by Teddy Wilson, accompanied by the incomparable trio of Billie Holiday, Benny Goodman, and Lester Young. The collaboration resulted in a rendition that not only showcased the seamless interplay between instrumental and vocal elements but also highlighted the emotional depth of Holiday's delivery.",
      youtubeEmbed: "a2FeSEiXaR0"
    },
    {
      title: "My Man (Mon Homme)",
      year: 1920,
      description: "\"Mon Homme\", also known as \"My Man\" in its English translation, stands as a timeless and emotionally resonant song that has endured for over a century. First published in 1920, the melody was crafted by Maurice Yvain, with the original French lyrics penned by Jacques-Charles (Jacques Mardochée Charles) and Albert Willemetz. The English adaptation, with lyrics by Channing Pollock, transformed the song into a poignant exploration of love and heartache. Billie Holiday also recorded this niche song and had been so popular.",
      youtubeEmbed: "0G5B2x0_RFE"
    },
    {
      title: "Crazy He Calls Me",
      year: 1949,
      description: "\"Crazy He Calls Me,\" a 1949 jazz standard, bears the creative imprint of composer Carl Sigman and lyricist Bob Russell. However, it is perhaps most memorably brought to life through the soulful interpretation of the legendary jazz singer Billie Holiday. With her distinctive phrasing and emotive delivery, Holiday infused the song with a unique depth that resonated with audiences. The track is a testament to the collaborative brilliance of Sigman and Russell in crafting a composition that, when paired with Holiday's incomparable voice, became a timeless piece within the jazz repertoire.",
      youtubeEmbed: "1-qY58CB00U"
    },
    {
      title: "Lady Sings The Blues",
      year: 1956,
      description: "\"Lady Sings the Blues,\" penned by the iconic jazz singer Billie Holiday in collaboration with jazz pianist Herbie Nichols, stands as a poignant musical narrative that encapsulates the essence of Holiday's tumultuous life. Serving as the title track for her 1956 album on Clef/Verve Records, the song weaves a soulful tapestry of emotion, reflecting the highs and lows of Holiday's personal journey. The track not only lent its name to Holiday's autobiography co-authored with William Dufty but also became the focal point of the 1972 cinematic portrayal of her life, featuring Diana Ross in a memorable performance. The song's timeless resonance lies in its ability to convey the raw, emotional depth of Holiday's experiences, making \"Lady Sings the Blues\" a quintessential piece that transcends music, becoming a powerful chapter in the larger narrative of jazz history.",
      youtubeEmbed: "86noyV-4kYk"
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
          <h1 className="text-4xl font-bold mb-4">Billie Holiday</h1>
          <p className="text-xl mb-8">
            Billie Holiday, born Eleanora Fagan in 1915, emerged as a luminous force in the realm of jazz and swing music. Nicknamed "Lady Day" by her friend Lester Young, her vocal style, inspired by jazz instrumentalists, redefined the art of phrasing and tempo manipulation. Despite a tumultuous life marked by legal troubles and drug abuse, Holiday's resilience and artistry shone through, leaving an enduring legacy in the form of iconic hits like "What a Little Moonlight Can Do." Her influence, encapsulated in four posthumous Grammy Awards and inductions into prestigious halls of fame, cements her as an everlasting presence in the rich tapestry of musical history.
          </p>
          <p className="text-xl mb-8">
            Billie Holiday's impact on the world of music extends far beyond her Grammy Awards and hall of fame inductions. Her indelible mark on jazz, encapsulated in the haunting beauty of her voice, continues to resonate through the ages. As she grappled with personal struggles and an evolving vocal tone, Holiday's artistry remained an unwavering force, exemplified in her final album, "Lady in Satin." Her enduring influence is felt not just in accolades but in the very fabric of jazz and popular singing, a testament to an artist who, against all odds, changed the course of musical history.
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

export default BillieHoliday;