import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const TomPetty = () => {
  const songs = [
    {
      title: "Wildflowers",
      year: 1994,
      description: "Closing our top 10 is the title track from Petty's second solo album. This gentle, acoustic-driven song demonstrates Petty's softer side, with its poetic lyrics and beautiful melody showcasing his versatility as a songwriter.",
      youtubeEmbed: "GdPglup_P8I"
    },
    {
      title: "The Waiting",
      year: 1981,
      description: "This jangly, upbeat track showcases Petty's talent for creating optimistic rock anthems. Its themes of anticipation and hope, coupled with its infectious melody, make it a fan favorite and a testament to Petty's songwriting skills.",
      youtubeEmbed: "uMyCa35_mOg"
    },
    {
      title: "You Don't Know How It Feels",
      year: 1994,
      description: "With its laid-back groove and harmonica riff, this song became one of Petty's signature solo tracks. Its frank lyrics and memorable chorus exemplify Petty's knack for crafting relatable, down-to-earth rock songs.",
      youtubeEmbed: "9TlBTPITo1I"
    },
    {
      title: "Don't Do Me Like That",
      year: 1979,
      description: "This upbeat, catchy song was one of Petty's first top 10 hits. Its blend of rock and new wave influences, coupled with Petty's sardonic lyrics, showcase his ability to create radio-friendly yet substantive rock music.",
      youtubeEmbed: "EFkJ_BOz88E"
    },
    {
      title: "Mary Jane's Last Dance",
      year: 1993,
      description: "This bluesy rock track, with its distinctive guitar lick and mysterious lyrics, became one of Petty's last major hits with the Heartbreakers. Its gritty sound and enigmatic story demonstrate Petty's continued relevance in the 1990s.",
      youtubeEmbed: "aowSGxim_O8"
    },
    {
      title: "Runnin' Down a Dream",
      year: 1989,
      description: "This driving rock song features one of Petty's most recognizable guitar riffs. Its themes of freedom and pursuit of one's goals, combined with its energetic performance, make it a staple of classic rock radio.",
      youtubeEmbed: "Y1D3a5eDJIs"
    },
    {
      title: "Learning to Fly",
      year: 1991,
      description: "With its folk-rock feel and uplifting lyrics, \"Learning to Fly\" became one of Petty's most beloved songs. Its message of perseverance and self-discovery, coupled with a memorable melody, showcases Petty's talent for creating both personal and universal songs.",
      youtubeEmbed: "s5BJXwNeKsQ"
    },
    {
      title: "I Won't Back Down",
      year: 1989,
      description: "This defiant anthem of resilience resonates with its simple yet powerful message. Petty's straightforward delivery and the song's steady beat create a timeless ode to standing one's ground in the face of adversity.",
      youtubeEmbed: "nvlTJrNJ5lA"
    },
    {
      title: "American Girl",
      year: 1976,
      description: "One of Petty's earliest hits with the Heartbreakers, \"American Girl\" showcases his ability to craft energetic rock songs with memorable hooks. Its jangly guitar riff and vivid storytelling set the template for much of Petty's future work.",
      youtubeEmbed: "mJvdXifGwWE"
    },
    {
      title: "Free Fallin'",
      year: 1989,
      description: "This iconic track from Petty's solo album \"Full Moon Fever\" became one of his most recognizable hits. Its simple yet catchy guitar riff, relatable lyrics, and sing-along chorus make it a timeless classic that epitomizes Petty's songwriting prowess.",
      youtubeEmbed: "1lWJXDG2i0A"
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
          <h1 className="text-4xl font-bold mb-4">Tom Petty</h1>
          <p className="text-xl mb-8">
            Thomas Earl Petty, born on October 20, 1950, in Gainesville, Florida, was one of the most influential and beloved American rock musicians of the late 20th and early 21st centuries. As the lead vocalist and guitarist of Tom Petty and the Heartbreakers, and as a successful solo artist, Petty crafted a distinctive sound that blended elements of rock, folk, and Americana. Known for his honest songwriting, distinctive nasal voice, and jangly guitar sound, Petty's music resonated with millions of fans across multiple generations.
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

export default TomPetty;