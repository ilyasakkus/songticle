import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const EdSheeran = () => {
  const songs = [
    {
      title: "Shape of You",
      year: 2017,
      description: "\"Shape of You\" is an infectious and chart-topping pop hit by the English singer-songwriter Ed Sheeran. Released in 2017 as the lead single from his third studio album, \"÷\" (Divide), this song quickly became a global sensation and one of Sheeran's most recognizable tracks. The song opens with a catchy and rhythmic guitar riff, immediately drawing the listener into its upbeat and danceable groove. Sheeran's vocals are smooth and inviting as he delves into the themes of attraction, desire, and the excitement of meeting someone new. The lyrics vividly describe a chance encounter at a bar, where the singer is captivated by the physical and emotional allure of the person he meets.",
      youtubeEmbed: "JGwWNGJdvx8"
    },
    {
      title: "Thinking Out Loud",
      year: 2014,
      description: "\"Thinking Out Loud\" is a timeless and soulful ballad by the English singer-songwriter Ed Sheeran. Released in 2014 as part of his second studio album, \"×\" (Multiply), this song has captured the hearts of millions with its beautiful melody and heartfelt lyrics. It has become an anthem for enduring love and a staple at weddings and romantic occasions.",
      youtubeEmbed: "lp-EO5I60KA"
    },
    {
      title: "Perfect",
      year: 2017,
      description: "\"Perfect\" is a heartwarming and romantic ballad by the English singer-songwriter Ed Sheeran. Released in 2017 as a single from his third studio album, \"÷\" (Divide), this song has become an anthem for love and devotion, captivating listeners with its heartfelt lyrics and beautiful melody. The chorus is irresistibly catchy, with Sheeran singing, \"Darling, you look perfect tonight.\" This simple yet profound declaration of love resonates deeply with anyone who has ever been in love. It encapsulates the idea that in the eyes of the one you love, you are perfect just as you are, flaws and all.",
      youtubeEmbed: "2Vv-BfVoq4g"
    },
    {
      title: "Photograph",
      year: 2015,
      description: "\"Photograph\" is a poignant and tender ballad by the English singer-songwriter Ed Sheeran. Released in 2015 as a single from his second studio album, \"×\" (Multiply), this song is a beautiful exploration of love, nostalgia, and the power of captured memories. The chorus is beautifully simple and incredibly catchy, with Sheeran crooning, \"Loving can hurt, loving can hurt sometimes / But it's the only thing that I know.\" These lines encapsulate the idea that love, despite its potential for pain and heartache, is a fundamental and irreplaceable part of the human experience.",
      youtubeEmbed: "nSDgHBxUbVQ"
    },
    {
      title: "Give Me Love",
      year: 2012,
      description: "\"Give Me Love\" is a poignant and emotionally charged song by the English singer-songwriter Ed Sheeran. Released as a single from his debut studio album, \"+,\" in November 2012, this song showcases Sheeran's exceptional talent for storytelling through music and his ability to convey deep emotions through his lyrics and performance. \"Give Me Love\" is notable for its gradual build in intensity, with Sheeran's vocals becoming more impassioned as the song progresses. The addition of backing vocals and percussion adds depth and power to the track, culminating in a cathartic and emotionally charged climax.",
      youtubeEmbed: "FOjdXSrtUxA"
    },
    {
      title: "Galway Girl",
      year: 2017,
      description: "\"Galway Girl\" is an infectious and lively pop-folk song by the English singer-songwriter Ed Sheeran. Released in March 2017 as a single from his third studio album, \"÷\" (Divide), the song quickly became a fan favorite and a chart-topping hit. \"Galway Girl\" is a testament to Sheeran's knack for storytelling through music and his ability to craft catchy melodies that resonate with listeners.",
      youtubeEmbed: "87gWaABqGYs"
    },
    {
      title: "I Don't Care",
      year: 2019,
      description: "\"I Don't Care\" is a vibrant and euphoric pop collaboration between two musical powerhouses, Ed Sheeran and Justin Bieber. Released in May 2019, this song was an instant hit and became one of the standout tracks of the year. It's a testament to the infectious energy that results when two superstar artists join forces to create music that resonates with a wide audience.",
      youtubeEmbed: "y83x7MgzWOA"
    },
    {
      title: "Bad Habits",
      year: 2021,
      description: "\"Bad Habits\" is an infectious and chart-topping pop hit by the English singer-songwriter Ed Sheeran. Released in June 2021 as a lead single from his upcoming album \"≈\" (Equals), this song marks a departure from some of Sheeran's previous acoustic and folk-infused styles, embracing a more contemporary and dance-pop sound. The song opens with a pulsating electronic beat that immediately sets the tone for a catchy and energetic track. Lyrically, \"Bad Habits\" explores themes of temptation, desire, and the struggle to break free from unhealthy patterns in one's life. Sheeran's vocals are as smooth and emotive as ever, delivering lyrics that convey a sense of vulnerability and self-reflection.",
      youtubeEmbed: "orJSJGHjBLI"
    },
    {
      title: "Castle On The Hill",
      year: 2017,
      description: "\"Castle on the Hill\" is an electrifying anthem by the English singer-songwriter Ed Sheeran. Released in January 2017 as a lead single from his third studio album, \"÷\" (Divide), this song serves as a nostalgic and autobiographical journey through Sheeran's past, paying homage to his upbringing and the people who shaped his life. From the very beginning, \"Castle on the Hill\" strikes a chord with listeners, opening with a spirited guitar riff that immediately captures the essence of youthful energy and longing for the past. Sheeran's heartfelt and vivid lyrics take us back to his hometown of Framlingham, Suffolk, as he reminisces about his formative years, filled with teenage adventures, first loves, and the enduring friendships that defined his youth.",
      youtubeEmbed: "K0ibBPhiaG0"
    },
    {
      title: "Perfect Symphony",
      year: 2017,
      description: "\"Perfect Symphony\" is a mesmerizing and heartwarming song that beautifully showcases the vocal talents of two iconic artists: Ed Sheeran and Andrea Bocelli. Released in December 2017 as part of the \"÷\" (Divide) album deluxe edition, this musical masterpiece is a symphonic rendition of Sheeran's original hit, \"Perfect.\" What makes \"Perfect Symphony\" truly exceptional is the seamless fusion of two distinct musical worlds – the pop sensibilities of Ed Sheeran and the operatic brilliance of Andrea Bocelli.",
      youtubeEmbed: "eiDiKwbGfIY"
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
          <h1 className="text-4xl font-bold mb-4">Ed Sheeran</h1>
          <p className="text-xl mb-8">
            Ed Sheeran, the illustrious English singer-songwriter, has become a veritable icon in the world of music, captivating hearts and souls with his soulful melodies and poignant lyrics. Born in Halifax, West Yorkshire, and nurtured in the picturesque surroundings of Framlingham, Suffolk, Sheeran's musical journey began at a remarkably young age, with the gifted artist composing his first songs when he was just eleven years old. In 2011, the world was introduced to Sheeran's musical genius when he independently unveiled the extended play "No. 5 Collaborations Project." This marked the inception of a meteoric rise in his career, as he soon inked a deal with Asylum Records, setting the stage for his ascent to global stardom.
          </p>
          <p className="text-xl mb-8">
            Sheeran's debut album, aptly titled "+ ("Plus")," graced the airwaves in September 2011, swiftly ascending to the pinnacle of the UK Albums Chart. The album's lead single, "The A Team," was a poignant masterpiece that resonated deeply with listeners, establishing Sheeran as a bona fide sensation. The following year brought accolades galore, with Sheeran securing the Brit Awards for Best British Male Solo Artist and British Breakthrough Act, affirming his status as a musical luminary. In 2014, the world was treated to the sonic brilliance of his second studio album, "× ("Multiply")," which soared to chart supremacy across the globe. This album not only cemented Sheeran's position as an international chart-topper but also earned the distinction of being the second-best-selling album worldwide in 2015. His extraordinary talent did not go unnoticed, as he garnered Album of the Year at the 2015 Brit Awards and the prestigious Ivor Novello Award for Songwriter of the Year.
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

export default EdSheeran;