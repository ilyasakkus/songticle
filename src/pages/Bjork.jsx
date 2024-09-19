import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const Bjork = () => {
  const songs = [
    {
      title: "Army Of Me",
      year: 1995,
      description: "\"Army of Me\" the compelling lead single from Björk's second studio album \"Post\" (1995), showcases her songwriting and production collaboration with Graham Massey. Inspired by her brother's destructive behavior, the song urges him to rise and take control of his life. Praised by music critics for its darker tone compared to her other work, \"Army of Me\" achieved commercial success, becoming Björk's first single to enter the top 10 of the UK Singles Chart. Premiered during the Debut Tour, Björk performed the song on various TV shows, including an iconic performance with Skunk Anansie on Top of the Pops. The song's music video, directed by Michel Gondry, depicts Björk driving a colossal vehicle through a city, confronting a gorilla dentist to reclaim a stolen diamond, and freeing a boy by bombing a museum with dynamite. The song's enduring influence is evident through its inclusion in Björk's \"Greatest Hits\" album and the release of the \"Army of Me: Remixes and Covers\" charity compilation by Björk in 2005, featuring various artists' interpretations of the track in support of UNICEF.",
      youtubeEmbed: "6KxtgS2lU94"
    },
    {
      title: "Venus As A Boy",
      year: 1993,
      description: "\"Venus as a Boy\" the second single from Björk's debut album \"Debut\" (1993), was a mesmerizing creation written and produced by the Icelandic musician herself, with Nellee Hooper as the primary producer. Inspired by a boy's unique perspective of seeing the world through a \"beauty point of view,\" the song's ambient and chill-out vibes incorporated Indian instruments like tablas, resulting in moderate international success but chart-topping status in Iceland. The music video, directed by Sophie Muller, showcased Björk cooking eggs and drew inspiration from her favorite book \"Story of the Eye.\" \"Venus as a Boy\" became a staple in her live performances and was embraced by fans who selected it for inclusion in her \"Greatest Hits\" album. Its enduring influence extended to over 30 cover versions by other artists, solidifying its place as a timeless and cherished piece in Björk's illustrious career.",
      youtubeEmbed: "J1Rd7zrvW7k"
    },
    {
      title: "Stonemilker",
      year: 2015,
      description: "\"Stonemilker\" the poignant opening track from Björk's eighth studio album \"Vulnicura,\" stands as a heart-wrenching testimony to the end of her relationship with artist Matthew Barney. Written and produced by Björk, with beats by Arca, the song forms the first chapter of a six-part narrative that unfolds throughout the album, delving into the emotional journey of heartbreak and healing. Björk penned the lyrics on an Icelandic beach, which would later serve as the location for the innovative 360-degree music video, adding an intimate layer to the song's powerful storytelling. Although \"Stonemilker\" received limited airplay in a shortened radio edit and saw no official commercial single release as part of \"Vulnicura,\" it remains a profound and resonant piece in Björk's discography, beautifully encapsulating the raw vulnerability and creative vision that defines her artistry.",
      youtubeEmbed: "gQEyezu7G20"
    },
    {
      title: "Lionsong",
      year: 2015,
      description: "\"Lionsong,\" the evocative second track from Icelandic singer and musician Björk's eighth studio album, \"Vulnicura,\" showcases her songwriting and composing prowess. Collaborating with Venezuelan musician Arca, who contributed the beats and co-produced the song, Björk weaves a mesmerizing sonic tapestry that delves into themes of vulnerability and emotional healing. Although \"Lionsong\" was released as a promotional single to select radio stations in certain territories, including the US, Vulnicura itself did not feature any official commercial singles, making \"Lionsong\" a standout representation of the album's artistic depth. Throughout the album's journey, Björk's soul-stirring exploration of heartbreak and recovery is evident, solidifying \"Lionsong\" as a poignant and unforgettable piece in the compelling mosaic of \"Vulnicura.\"",
      youtubeEmbed: "MWHpoJT3qK4"
    },
    {
      title: "Utopia",
      year: 2017,
      description: "\"Utopia,\" the groundbreaking ninth studio album by Icelandic singer-musician Björk, is a collaborative masterpiece primarily produced by Björk herself and the Venezuelan electronic record producer Arca. Released on 24 November 2017 through One Little Independent Records in the UK and The Orchard Enterprises in the US, the album received widespread acclaim from music critics, who praised its innovative production, exceptional songwriting, and Björk's mesmerizing vocals. The album's artistic excellence garnered it a nomination for Best Alternative Music Album at the 61st Annual Grammy Awards, marking Björk's remarkable eighth consecutive nomination in the category. With \"Utopia,\" Björk continues to push the boundaries of her artistry, delivering an ethereal and avant-garde musical experience that solidifies her status as a visionary and influential artist in the world of contemporary music.",
      youtubeEmbed: "Sqbv7cCM5AI"
    },
    {
      title: "Human behaviour",
      year: 1993,
      description: "\"Human Behaviour\" the mesmerizing lead single from Icelandic recording artist Björk's debut studio album \"Debut\" (1993), was produced by her longtime collaborator Nellee Hooper and delves into the complexities of human nature and emotions, seen from the perspective of a non-human animal. Inspired by renowned naturalist David Attenborough, the song received critical acclaim and emerged as an underground hit, reaching number two on the dance charts and number 36 on the UK Singles Chart. Its captivating music video, directed by Michel Gondry, marks the first collaboration between Björk and the visionary director, portraying the relationship between humans and animals from the animal's point of view, echoing the song's exploration of humanity's connection with nature. Together, \"Human Behaviour\" and its accompanying video cemented Björk's status as an innovative artist with a unique vision and artistic flair.",
      youtubeEmbed: "p0mRIhK9seg"
    },
    {
      title: "All is full of love",
      year: 1997,
      description: "\"All Is Full of Love\" is a mesmerizing trip hop ballad by Icelandic musician Björk from her album \"Homogenic\" (1997). Inspired by themes of love in spring and Norse mythology's Ragnarök, the song's original version is enriched with soul influences, harp, strings, and electronic beats, while a minimalist remix by Howie B appears on the album. The single's true impact, however, lies in its iconic music video directed by Chris Cunningham, featuring Björk as a robot assembling in a factory and passionately kissing another robot, exploring the essence of love and humanity in a futuristic setting. Hailed as one of the greatest music videos ever and a computer animation milestone, the single reached UK's top 24 and became a dance hit in the US, solidifying \"All Is Full of Love\" as a timeless classic cherished by fans and covered by various artists.",
      youtubeEmbed: "b_VFWR7aB60"
    },
    {
      title: "Oceania",
      year: 2004,
      description: "\"Oceania,\" a captivating offering by Icelandic singer Björk from her album \"Medúlla,\" was penned and produced by Björk herself, with additional writing by Sjón and production by Mark Bell. Originally composed for the 2004 Summer Olympics Opening Ceremony at the request of the International Olympic Committee, the song takes on the perspective of the ocean, symbolizing the origin of all life, and traces the evolution of humanity with the accompaniment of a choir. Released as a promotional single in August 2004, \"Oceania\" garnered praise from music critics, with some hailing it as the standout track from \"Medúlla,\" although opinions varied on its suitability as a promotional release. The song's enchanting music video, directed by Lynn Fox, features Björk as \"Mother Oceania\" submerged in a jeweled aquatic world, surrounded by vivid sunsets and swirling floral creatures. Additionally, a remix featuring Kelis providing alternate lyrics and vocals from the perspective of the continents was featured as a B-side to the \"Who Is It\" single. Nominated for Best Female Pop Vocal Performance at the 47th Grammy Awards, \"Oceania\" has since become a beloved addition to Björk's live performances and has inspired numerous cover versions and a sample.",
      youtubeEmbed: "Qv5ZU06JDN4"
    },
    {
      title: "The Gate",
      year: 2017,
      description: "Björk's lead single, \"The Gate,\" from her ninth studio album \"Utopia,\" is an ambient and electronica masterpiece co-written and produced by Björk and Arca. Released in 2017, the song muses on the complex facets of love and serves as a transformative transition from the themes explored in her previous album, \"Vulnicura.\" The song's enchanting soundscapes, coupled with Björk's captivating vocal delivery, received acclaim from music critics, while the visually stunning music video directed by Andrew Thomas Huang added to its allure. Embodying Björk's artistic evolution and boundless creativity, \"The Gate\" stands as an ethereal exploration of love and spiritual connection, solidifying Björk's position as an iconic and visionary artist.",
      youtubeEmbed: "RIGgn1s3AvI"
    },
    {
      title: "Moon",
      year: 2011,
      description: "\"Moon,\" the captivating first track from Björk's album Biophilia, emerges as a mesmerizing ode to the lunar world and its profound influence on our planet. As part of Björk's ambitious exploration of nature-themed songs on the album, \"Moon\" delves into the enigmatic realm of lunar cycles and their mysterious impact on Earth. Released as the fourth and final single on September 6, 2011, the song weaves together ethereal sounds and Björk's distinctive vocals to create a celestial sonic experience that resonates with listeners on a cosmic level. In \"Moon,\" Björk's artistic vision transcends conventional boundaries as she seamlessly merges science and art. Delving into the interconnectedness of the cosmos, she crafts a sonic landscape that mirrors the ever-changing phases of the moon and its profound effect on our world. As the opening track of Biophilia, \"Moon\" serves as a gateway to an album that celebrates the magnificence of nature and the delicate balance between the celestial and the terrestrial.",
      youtubeEmbed: "br2s0xJyFEM"
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
          <h1 className="text-4xl font-bold mb-4">Björk</h1>
          <p className="text-xl mb-8">
            In the ever-changing tapestry of modern music, there exists an ethereal force that defies conventions and transcends the ordinary - the inimitable Björk Guðmundsdóttir. With her mesmerizing three-octave vocal range and unapologetically eccentric persona, the Icelandic songstress has carved an indelible mark on the avant-garde landscape of contemporary music. As we embark on a beguiling journey through the annals of her illustrious four-decade career, we uncover the enigma of Björk's greatest hits, resonating across genres and generations, enchanting both critics and devoted fans alike.
          </p>
          <p className="text-xl mb-8">
            In the annals of musical history, Björk reigns as an ethereal visionary, an artist who has ceaselessly pushed the boundaries of her craft and dared to create uncharted sonic landscapes. Through her kaleidoscope of influences and unapologetic individuality, she has gifted the world with a tapestry of sonic gems that resonate with universal themes of love, empowerment, and the human experience. As we reflect upon her top 10 all-time greatest hits, we are reminded that Björk's legacy extends far beyond the realm of music; she is an enigmatic force, an artist who has continuously evolved, and an icon whose ethereal aura will forever reverberate in the hearts of those who seek transcendence through the power of sound.
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

export default Bjork;