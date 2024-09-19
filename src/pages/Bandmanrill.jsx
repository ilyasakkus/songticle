import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const Bandmanrill = () => {
  const songs = [
    {
      title: "Jiggy In Jersey",
      year: 2022,
      description: "\"Jiggy In Jersey\" is a high-energy anthem that celebrates the vibrant essence of Bandmanrill's roots in Newark, New Jersey. Infused with infectious beats and captivating rhymes, the song encapsulates the rapper's unapologetic pride in his hometown and the distinctive culture that shaped him. With an unwavering swagger, Bandmanrill lyrically paints a vivid picture of the city's allure, drawing listeners into the electric atmosphere of its streets. The track is a mesmerizing showcase of his musical prowess and charismatic persona, firmly establishing him as a torchbearer of the Jersey hip-hop scene.",
      youtubeEmbed: "bOUSPvy6drs"
    },
    {
      title: "FLOYD",
      year: 2022,
      description: "In the triumphant \"Floyd\" by Bandmanrill, the rapper unapologetically revels in his newfound success and status, basking in the limelight of wealth and fame. With unbridled exuberance, the first verse paints a vivid picture of his opulent lifestyle, showcasing lavish spending habits and an unshakeable tough persona that commands attention wherever he goes. The chorus serves as a captivating anthem to his own greatness, drawing a parallel to the legendary boxer Floyd Mayweather, symbolizing Bandmanrill's immense self-assurance and confidence.",
      youtubeEmbed: "TcvW-jfuvo0"
    },
    {
      title: "Copy and Paste",
      year: 2022,
      description: "\"Copy and Paste\" by Bandmanrill is a striking anthem that exudes the artist's unapologetic confidence and relentless pursuit of success. With an audacious blend of swagger and self-awareness, the song delves into the rapper's journey to the top, unabashedly addressing those who attempt to imitate his inimitable style, only to fall short in the shadow of his unique talent. Bandmanrill fearlessly declares his hunger for wealth and fame, unapologetically embracing his aggressive attitude as a driving force behind his triumphs.",
      youtubeEmbed: "6YfHv-BarS0"
    },
    {
      title: "DON'T MAKE ME CRASH",
      year: 2022,
      description: "With \"DON'T MAKE ME CRASH (GIRL WITH THE TATTOO REMIX),\" Bandmanrill unapologetically delves into the complexities of trust and loyalty, crafting an unyielding anthem that dares to demand authenticity. Exuding magnetic confidence, the rapper effortlessly navigates the lyrical landscape, making it abundantly clear that he has no time for the disingenuous or insincere. In the first verse, he boldly dismisses the \"lame\" and \"goofy,\" surrounding himself only with those who uphold the sacred tenets of loyalty.",
      youtubeEmbed: "CyTG2W4CTOE"
    },
    {
      title: "LA FREESTYLE",
      year: 2022,
      description: "\"La Freestyle\" exudes electrifying energy, showcasing Bandmanrill's lyrical prowess and magnetic charisma. In this electrifying rap masterpiece, the artist unleashes a torrent of raw emotions and untamed talent, effortlessly weaving through verses that paint vivid pictures of street life and his journey to success. Each bar delivers a powerful punch, and the beat serves as the perfect canvas for Bandmanrill to showcase his mastery of flow and rhythm.",
      youtubeEmbed: "b5wFU4zziLQ"
    },
    {
      title: "Real Hips",
      year: 2022,
      description: "\"Real Hips\" by Bandmanrill offers a provocative and candid glimpse into the rapper's sensual escapades and unwavering loyalty to his inner circle. With lyrics like \"put my hands on ya hips,\" the song delves unapologetically into the realm of intimate encounters, expressing his appreciation for the allure of a woman's hips during moments of passion. Amidst the steamy narrative, Bandmanrill showcases the profound bond he shares with his friends or \"bros,\" emphasizing his willingness to go to great lengths for their sake, even if it means sacrificing everything he has.",
      youtubeEmbed: "MmEkPi8byyM"
    },
    {
      title: "Influence",
      year: 2022,
      description: "Bandmanrill's \"INFLUENCE\" is a magnetic anthem that boldly lays bare the rapper's journey to prosperity and dominance within the rap industry. In a gripping intro, he confronts the green-eyed glares of envy, setting the stage for an unapologetic narrative of ambition and success. The chorus resonates with unbridled determination as Bandmanrill unapologetically pursues wealth and triumph, unabashedly casting aside conventional paths like formal education.",
      youtubeEmbed: "30JQn6frGKA"
    },
    {
      title: "FREE BRO",
      year: 2022,
      description: "\"Free Bro,\" an emotionally charged anthem featured in Bandmanrill's illustrious \"Club Godfather\" album, stands as a poignant tribute to a dear friend ensnared by legal struggles or confinement. With the opening line \"Free bro,\" the artist lays bare his heartfelt desire for his friend's liberation. Throughout the song, Bandmanrill unapologetically speaks of his own esteemed reputation on the streets, a testament to his powerful and respected persona.",
      youtubeEmbed: "BlVAVasFJp8"
    },
    {
      title: "PIANO",
      year: 2022,
      description: "\"Piano,\" a captivating collaboration between Bandmanrill and Lay Bankz, emerged as a standout gem within the illustrious \"Club Godfather\" album, released in 2022. This enchanting piano-driven track showcased the artistic prowess of both musicians, weaving a spellbinding tale through their harmonious blend of talents. With its mesmerizing melody and infectious rhythm, \"Piano\" lured listeners into a world of musical brilliance, transcending the boundaries of conventional rap.",
      youtubeEmbed: "dtnWvBk6rZQ"
    },
    {
      title: "LURKIN",
      year: 2022,
      description: "In the controversial track \"Lurkin\" by Bandmanrill, the artist delves into a perilous narrative, glorifying a lifestyle riddled with danger and recklessness. While the chorus seemingly encourages hard work to achieve success, the verses tell a different tale, painting a disturbing picture of a character immersed in criminal activities, including theft, violence, and gunplay. The presence of lines that insinuate sexually abusive relationships further compounds the problematic and offensive nature of the song.",
      youtubeEmbed: "-d7UokU46QY"
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
          <h1 className="text-4xl font-bold mb-4">Bandmanrill</h1>
          <p className="text-xl mb-8">
            Step into the extraordinary world of Bandmanrill, the trailblazing American rapper and songwriter hailing from Newark, New Jersey. Amidst the challenges of the COVID-19 pandemic, he emerged as a beacon of creativity, captivating audiences with his innovative fusion of Jersey club and drill elements. Under the esteemed Warner Music Group, Bandmanrill's rise to fame was swift, and in April 2021, he astounded critics and fans alike with the unforgettable "Heartbroken" track, hailed by Pitchfork as the "must-hear rap song of the day." A lyrical virtuoso, he continued to impress with the magnetic "Tonight's Da Night Freestyle" in November 2021.
          </p>
          <p className="text-xl mb-8">
            In August 2022, Bandmanrill's sonic evolution reached new heights with the release of "Real Hips," lauded by The New York Times' Jon Caramanica for its exquisite blend of drill music, Jersey club, and bass influences. But the true pinnacle of his artistry manifested in October 2022, as he unveiled his debut opus, "Club Godfather" featuring remarkable collaborations with NLE Choppa, Lay Bankz, Skaiwater, Sha EK, and DJ swill. This monumental project solidified Bandmanrill's status as a pioneer of the hip-hop scene, leaving an indelible mark on the hearts and minds of music enthusiasts worldwide, who now eagerly await the next chapter in his awe-inspiring journey.
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

export default Bandmanrill;