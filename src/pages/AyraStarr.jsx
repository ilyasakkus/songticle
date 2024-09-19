import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const AyraStarr = () => {
  const songs = [
    {
      title: "Skinny Girl Anthem",
      year: 2023,
      description: "With \"Skinny Girl Anthem,\" Ayra Starr once again proves her musical prowess and ability to create enchanting tunes that resonate with audiences. Featuring the talented Kayykilo, this track is a powerful and empowering anthem that celebrates body positivity and self-love. The song's captivating melody and Ayra's soulful vocals create an immersive experience that uplifts and inspires listeners. \"Skinny Girl Anthem\" showcases Ayra's versatility as an artist, effortlessly blending elements of Afropop and R&B to deliver a memorable and heartfelt performance.",
      youtubeEmbed: "VF9P69nX_b4"
    },
    {
      title: "Ija",
      year: 2021,
      description: "\"Ija\" marks a triumphant return for the incredibly talented artist, Ayra Starr, as she unveils her brand new single to the delight of her fans. This captivating song is a standout track from Ayra Starr's debut album, titled 'Ayra Starr EP,' which serves as her remarkable introductory work in the music industry. With \"Ija,\" Ayra once again showcases her prowess as both a singer and a storyteller. The song's powerful and emotive lyrics, combined with Ayra's soulful vocals, create an immersive experience that tugs at the heartstrings of listeners. \"Ija\" takes us on a journey of self-discovery and resilience, resonating with anyone who has faced challenges and adversities in life.",
      youtubeEmbed: "LZBA4vNvxXc"
    },
    {
      title: "Ase",
      year: 2022,
      description: "\"Ase\" is a stellar offering from the talented Mavin Records signee and the enchanting voice behind the hit track \"Bloody Samaritan,\" Ayra Starr. With this exceptional song, Ayra once again proves her versatility and artistry, delivering an extraordinary Afrosoul sound that mesmerizes her fans. The captivating melody, accompanied by her soulful vocals, weaves a tapestry of emotions, drawing listeners into the enchanting world of \"Ase.\" The song's brilliance lies in its ability to transcend boundaries, resonating not only with her devoted fans but also captivating new audiences across the music stage. As Ayra Starr continues to grace the industry with her unmatched talent, \"Ase\" serves as yet another testament to her immense potential and promises to be a timeless addition to her ever-growing repertoire.",
      youtubeEmbed: "PURNSXroBUE"
    },
    {
      title: "Snitch",
      year: 2021,
      description: "\"Snitch\" is an amazing and highly anticipated song that is part of Ayra Starr's EP project titled \"19 & Dangerous.\" This captivating track serves as a follow-up to her previously released 4-track album, the \"Ayra Starr EP,\" which continues to captivate listeners and dominate the airwaves. With her enchanting vocals and lyrical prowess, Ayra effortlessly weaves a tale of intrigue and betrayal in \"Snitch.\" The song's mesmerizing melody and evocative storytelling showcase Ayra's growth as an artist, leaving fans in awe of her musical evolution. As she continues to make waves in the music industry, \"Snitch\" is a testament to Ayra Starr's unique artistry and her ability to create music that resonates deeply with her audience. With each release, Ayra solidifies her position as one of Nigeria's most promising and talented artists, and \"Snitch\" further cements her status as a rising star to watch closely.",
      youtubeEmbed: "tUIvdWtkIBU"
    },
    {
      title: "Running",
      year: 2022,
      description: "\"Running\" is a captivating musical collaboration that sees Ayra Starr team up with fellow Nigerian singer, Lojay, to craft an alluring piece of art. This appealing song was recorded and released in 2022 and has quickly become a standout track on Ayra Starr's new and exquisitely curated album, \"19 And Dangerous (Deluxe)\". With their combined talents, Ayra and Lojay deliver a harmonious blend of their distinctive voices and styles, creating a mesmerizing and emotionally charged experience for listeners. The song's compelling lyrics and the seamless chemistry between the two artists make \"Running\" a true gem in Ayra Starr's musical repertoire. As they both showcase their vocal prowess, the track serves as a testament to the endless possibilities that arise when two gifted artists come together to create something truly exceptional. \"Running\" cements Ayra Starr's position as an artist to watch in the Nigerian music scene, leaving fans eagerly awaiting future collaborations and further masterpieces from this rising star.",
      youtubeEmbed: "Fw9vMPrZqWA"
    },
    {
      title: "Lonely Refix",
      year: 2023,
      description: "\"Lonely Refix\" is a spellbinding musical creation and one of Ayra Starr's most recent releases this year, distinguishing itself from her earlier tracks with its fresh sound and captivating charm. As a part of her \"19 & Dangerous Deluxe EP\" album, this song showcases Ayra's growth and evolution as an artist, pushing the boundaries of her musical prowess. To bring an extra touch of liveliness to the enchanting tune, she joined forces with the talented Marlian Music musician, Zinoleesky, whose mesmerizing vocals perfectly complement Ayra's soulful voice. The collaboration results in a harmonious blend of their unique styles, elevating the emotional depth of the song to new heights. \"Lonely Refix\" is a testament to Ayra Starr's ability to experiment with diverse sounds while maintaining her signature artistry, leaving fans eagerly anticipating what this rising star has in store for her musical journey ahead.",
      youtubeEmbed: "wvgdNT46DgA"
    },
    {
      title: "Sability",
      year: 2023,
      description: "\"Ayra Starr - Sability\" is a captivating musical gem that showcases the boundless talent of the Nigerian singer-songwriter. Released as part of her discography, the song effortlessly weaves together elements of Afropop and R&B, creating a mesmerizing and soulful experience for listeners. With her signature velvety vocals and poignant storytelling, Ayra Starr takes us on an emotive journey, exploring themes of love, vulnerability, and personal growth. \"Sability\" serves as a testament to Ayra's artistry and ability to connect with her audience on a profound level.",
      youtubeEmbed: "KYn3k8dpRJI"
    },
    {
      title: "Rush",
      year: 2022,
      description: "\"Rush\" stands as a defining moment in Ayra Starr's musical journey, marking her impressive debut single released on 16 September 2022 through Mavin Records and featured on her debut studio album, \"19 & Dangerous.\" The song's global success came as a thrilling surprise after it went viral on TikTok in 2023, propelling it to chart success worldwide. In particular, \"Rush\" soared to number 29 in the UK and secured positions in the top 40 in Switzerland and the Netherlands. Prior to this meteoric rise, Ayra Starr had already caught the attention of music enthusiasts, earning recognition as one of NME's artists to watch in 2022. The renowned publication highlighted her unique ability to skillfully blend Afro-pop with hints of R&B and trappy hit-hats, resulting in a distinctive sound that resonates with fans across the globe. With \"Rush,\" Ayra Starr solidifies her position as a rising star, leaving a lasting impression on the international music scene.",
      youtubeEmbed: "crtQSTYWtqE"
    },
    {
      title: "Beggie Beggie feat Ckay",
      year: 2021,
      description: "\"Ayra Starr - Beggie Beggie feat Ckay\" is a mesmerizing collaboration that showcases the undeniable chemistry between Ayra Starr and the talented artist Ckay. The song, released as part of Ayra Starr's musical journey, exudes a unique blend of Afropop and R&B elements that effortlessly entwine their soulful voices. With a seamless production that enhances the emotional depth of the lyrics, \"Beggie Beggie\" delves into themes of love, vulnerability, and the complexities of human relationships. Ayra's velvety vocals, coupled with Ckay's smooth delivery, create an enchanting duet that tugs at heartstrings and leaves listeners longing for more. The track serves as a testament to both artists' versatility and artistry, solidifying their positions as rising stars in the ever-evolving landscape of Nigerian music.",
      youtubeEmbed: "duRYbwzS-Xk"
    },
    {
      title: "Bloody Samaritan",
      year: 2021,
      description: "\"Bloody Samaritan\" stands as a resounding anthem of strength and resilience, etching its mark on the music scene as a pivotal track by the Nigerian singer-songwriter, Ayra Starr. Released on 30 July 2021, this empowering Afropop masterpiece quickly made its presence felt, becoming the lead single from Ayra's debut studio album, \"19 & Dangerous.\" The song's message is a rallying call for dream-chasers and believers, urging them to forge ahead despite naysayers and the weight of negative judgments. Written by Ayra Starr herself and skillfully produced by London, \"Bloody Samaritan\" effortlessly blends poignant storytelling with infectious beats. Premiering on BBC Radio 1Xtra before its streaming debut, the song took flight, resonating deeply with audiences far and wide, as they found strength and inspiration within its uplifting lyrics. With this empowering track, Ayra Starr further solidifies her status as a musical force to be reckoned with, weaving her magic and captivating hearts worldwide.",
      youtubeEmbed: "2QvbsWrTnxE"
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
          <h1 className="text-4xl font-bold mb-4">Ayra Starr</h1>
          <p className="text-xl mb-8">
            In the vast and ever-evolving landscape of music, there are rare occasions when an artist emerges with a celestial allure that captivates hearts from the very first note. Ayra Starr, a Beninese-born Nigerian singer, is undeniably one such artist. From her humble beginnings as a budding fashion model to her meteoric rise in the music industry, Ayra's journey has been nothing short of awe-inspiring. Her hauntingly soulful voice and poignant storytelling have earned her accolades and a legion of fans around the world.
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

export default AyraStarr;