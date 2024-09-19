import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const VanessaParadis = () => {
  const songs = [
    {
      title: "Joe le taxi",
      year: 1987,
      description: "\"Joe le taxi\" is an iconic song that catapulted French singer-actress Vanessa Paradis to international fame. Penned by Franck Langolff and Étienne Roda-Gil, this infectious track captivated audiences with its catchy melody and Paradis' distinctive vocals. Topping the SNEP Singles Chart for an impressive 11 weeks, \"Joe le taxi\" broke barriers as a French-language song by achieving success in the UK and Ireland, reaching numbers three and two respectively. The accompanying music video, produced by Lili Balian, Jake Hertz, and Addie Calcagnini, further propelled the song's popularity. Ultimately included on her debut album \"M&J\" (short for \"Marilyn & John\"), \"Joe le taxi\" remains an enduring symbol of Vanessa Paradis' early musical brilliance and continues to be cherished by fans worldwide.",
      youtubeEmbed: "Ulay2FvUEd8"
    },
    {
      title: "Marilyn Et John",
      year: 1988,
      description: "\"Marilyn et John\" is a timeless gem in Vanessa Paradis' repertoire, showcasing her unique charm and musical talent. Released as a single in 1988, the song captivated listeners with its nostalgic homage to the iconic figures Marilyn Monroe and John F. Kennedy. With its catchy melody and evocative lyrics, \"Marilyn et John\" became a standout track in Paradis' early career, earning her widespread recognition. The song's playful yet poignant portrayal of love and fame resonated with audiences, establishing Vanessa Paradis as a rising star in the French music scene. \"Marilyn et John\" remains a beloved classic, cherished by fans for its enduring appeal and Paradis' enchanting performance.",
      youtubeEmbed: "gWELhB49SWc"
    },
    {
      title: "Be My Baby",
      year: 1992,
      description: "\"Be My Baby\" the enchanting single by French singer and actress Vanessa Paradis, marked a significant milestone in her career. Released in September 1992 as the lead single from her third studio album, the song represented Paradis' debut into the English-language music scene. Written by her companion at the time, the acclaimed musician Lenny Kravitz, \"Be My Baby\" captivated audiences with its infectious melody and Paradis' captivating vocals. The song's widespread success, reaching the top 10 charts in multiple countries including Belgium, France, Germany, Ireland, the Netherlands, and the United Kingdom, solidified Vanessa Paradis' status as an international star. With its accompanying music video receiving heavy rotation on MTV Europe, \"Be My Baby\" remains a beloved classic in Paradis' repertoire, embodying her unique blend of charm and musical talent.",
      youtubeEmbed: "WXnR7iZy0ZM"
    },
    {
      title: "Il Y A",
      year: 1994,
      description: "\"Il Y A\" is a poignant and soulful song by Vanessa Paradis that has left an indelible mark on her fans. With its emotive lyrics and haunting melody, the song captures the essence of longing and heartache, showcasing Paradis' ability to convey raw emotions through her music. Released as a single, \"Il Y A\" has garnered widespread acclaim for its introspective lyrics and mesmerizing vocals, solidifying Vanessa Paradis' reputation as a versatile and talented artist. Whether it's through her evocative delivery or the heartfelt composition, \"Il Y A\" stands as a testament to Paradis' enduring influence in the world of music, resonating with listeners on a profound level.",
      youtubeEmbed: "hm7z_NCCZWk"
    },
    {
      title: "Mi Amor",
      year: 2007,
      description: "\"Mi Amor\" is a captivating and heartfelt song that showcases Vanessa Paradis' evocative vocals and emotional depth. Released as a single, it has become a cherished gem in her repertoire, captivating audiences with its romantic lyrics and enchanting melody. The song's title, meaning \"My Love\" in Spanish, reflects its theme of affection and passion, further enhanced by Paradis' expressive delivery. \"Mi Amor\" embodies the timeless appeal of Vanessa Paradis' music, resonating with listeners worldwide and solidifying her status as a renowned artist with an enduring ability to touch hearts through song.",
      youtubeEmbed: "fs5sxTIyn0s"
    },
    {
      title: "Divine Idylle",
      year: 2007,
      description: "\"Divine Idylle,\" the lead single from Vanessa Paradis' fifth studio album, \"Divinidylle,\" holds a special place in the artist's discography. Released in June 2007, the song received critical acclaim and quickly gained widespread popularity. The album, recorded between November 2005 and June 2007, showcased Paradis' musical evolution and was well-received by critics, with AllMusic even suggesting it was likely her best work up to that point. The captivating artwork for the album was designed by none other than American actor Johnny Depp, Paradis' companion at the time, adding a personal touch to the project. \"Divine Idylle\" not only became a chart-topping hit but also earned the distinction of being the most-played French single worldwide in 2007, according to Francophonie Diffusion. The enduring appeal of \"Divine Idylle\" is further highlighted by its cover by Taiwanese singer Jolin Tsai, titled \"Love Attraction,\" featured on her 2009 album Butterfly, underscoring the global influence and cross-cultural resonance of Vanessa Paradis' music.",
      youtubeEmbed: "3R_6sP_6VWE"
    },
    {
      title: "Dès Que J'Te Vois",
      year: 2007,
      description: "\"As Soon as I See You (Dès Que J'Te Vois)\" marks the 23rd single in Vanessa Paradis' illustrious career, and it stands as a captivating piece fully written and composed by the talented Matthieu Chedid. Launched on the radio in October 2007 and made available for legal download in November of the same year, the song served as the second single from Paradis' album \"Divinidyl.\" Matthieu Chedid's musical prowess is evident in the composition, creating a melodic and emotive backdrop for Vanessa Paradis' evocative vocals. The cover, featuring a photo by the renowned photographer Jean Baptiste Mondino, adds visual artistry to the release.",
      youtubeEmbed: "CDt14uZDfTo"
    },
    {
      title: "Ces mots simples",
      year: 2018,
      description: "\"Ces mots simples\" by Vanessa Paradis is a poignant and tender song that showcases the artist's lyrical finesse and emotive delivery. Featured on her 2018 album \"Les Sources\" the track is a beautiful exploration of love and simplicity. With lyrics that are both sincere, Paradis weaves a narrative that resonates with listeners on a personal level. The melody, coupled with Vanessa's soulful voice, creates a captivating musical experience. \"Ces mots simples\" reflects Vanessa Paradis' ability to convey deep emotions through her music, making it a standout piece in her discography and a testament to her enduring talent.",
      youtubeEmbed: "fSChfByWNqI"
    },
    {
      title: "Tandem",
      year: 1990,
      description: "\"Tandem,\" the 1990 rock song recorded by French singer Vanessa Paradis, is a magnetic piece that highlights the creative collaboration between Paradis and the legendary Serge Gainsbourg. With its music composed by Franck Langolff, the song was released as the lead single from Paradis' second album, \"Variations sur le même t'aime.\" Displaying a distinctive rock vibe, \"Tandem\" stands out for its infectious energy and Paradis' evocative vocals. The track not only secured a place as the seventh on the album but also emerged as one of Paradis' most popular songs, achieving top 30 chart positions in both France and the Netherlands.",
      youtubeEmbed: "yu1-ZeQ-leI"
    },
    {
      title: "Love Song",
      year: 2013,
      description: "\"Love Song\" by Vanessa Paradis is a captivating and soulful track that showcases the artist's vocal prowess and emotional depth. Released in 2013 as part of her album \"Love Songs\" the song explores the theme of love in all its complexity. With a melodic and poignant arrangement, Vanessa's voice effortlessly conveys the nuances of love, evoking a range of emotions in the listener. The lyrics are both poetic and introspective, weaving a narrative that captures the beauty, longing, and intricacies inherent in romantic relationships. \"Love Song\" stands as a testament to Vanessa Paradis' ability to infuse her music with genuine emotion, creating a timeless piece that resonates with fans and continues to be a cherished part of her repertoire.",
      youtubeEmbed: "RuD0iUgJ-L8"
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
          <h1 className="text-4xl font-bold mb-4">Vanessa Paradis</h1>
          <p className="text-xl mb-8">
            Vanessa Chantal Paradis, born on December 22, 1972, is a French icon renowned for her exceptional talents in singing, modeling, and acting. She catapulted to stardom at the age of 14 with the international hit "Joe le taxi" in 1987, marking the beginning of a remarkable career. Recognized with France's highest honors at the age of 18, Vanessa received the Prix Romy Schneider and the César Award for Most Promising Actress for her role in "Noce Blanche" and the Victoires de la Musique for Best Female Singer for her album "Variations sur le même t'aime." Beyond her musical success, Vanessa Paradis has left an indelible mark on French cinema, starring in acclaimed films such as "Élisa" (1995), "Girl on the Bridge" (1999), and "Café de Flore" (2011). A muse to several renowned musicians, including Serge Gainsbourg, Lenny Kravitz, and Benjamin Biolay, her artistic collaborations have added depth to her already illustrious career. In 2022, she continued to showcase her versatility, earning a Molière Award nomination for Best Actress for her compelling performance in the play "Maman." Vanessa Paradis remains an enduring figure in the world of entertainment, captivating audiences with her timeless talent and enduring influence.
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

export default VanessaParadis;