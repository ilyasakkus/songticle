import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const KurtCobain = () => {
  const songs = [
    {
      title: "Smells Like Teen Spirit",
      year: 1991,
      description: "Often hailed as the anthem of Generation X, \"Smells Like Teen Spirit\" catapulted Nirvana and Kurt Cobain into the mainstream. The song's explosive dynamics, from quiet verses to thunderous choruses, perfectly encapsulated the frustration and angst of youth culture. Cobain's gritty vocals and cryptic lyrics, coupled with the iconic guitar riff, created a cultural phenomenon that defined an era and changed the course of popular music.",
      youtubeEmbed: "zucJHYwi2Uc"
    },
    {
      title: "Come As You Are",
      year: 1992,
      description: "With its hypnotic guitar intro and Cobain's haunting vocals, \"Come As You Are\" became one of Nirvana's most recognizable hits. The song's lyrics, open to interpretation, showcase Cobain's talent for writing cryptic yet relatable verses. Its more melodic approach compared to some of Nirvana's heavier tracks demonstrated the band's versatility and Cobain's songwriting range.",
      youtubeEmbed: "NJqQf5DObtY"
    },
    {
      title: "Lithium",
      year: 1992,
      description: "\"Lithium\" exemplifies Cobain's ability to blend pop sensibilities with raw, punk-inspired energy. The song's lyrics, exploring themes of faith and mental health, reveal Cobain's introspective songwriting style. Its dynamic shift between soft verses and explosive choruses became a hallmark of Nirvana's sound, influencing countless bands in the years to come.",
      youtubeEmbed: "SJLe1UTqKvA"
    },
    {
      title: "Heart-Shaped Box",
      year: 1993,
      description: "From Nirvana's final studio album \"In Utero,\" \"Heart-Shaped Box\" showcases Cobain's more experimental side. The song's haunting melody, vivid imagery, and intense delivery create a powerful, emotionally charged experience. Its surreal music video, conceptualized by Cobain himself, further cements the track's status as a '90s alternative classic.",
      youtubeEmbed: "92fK3K8nagk"
    },
    {
      title: "All Apologies",
      year: 1993,
      description: "One of Cobain's most introspective and melancholic songs, \"All Apologies\" closes Nirvana's \"In Utero\" album with raw emotion. The track's stripped-down acoustic version, featured on the \"MTV Unplugged in New York\" album, particularly highlights Cobain's vulnerable side. Its poignant lyrics and melody have made it one of Nirvana's most beloved songs, offering a glimpse into Cobain's complex psyche.",
      youtubeEmbed: "fUYXpnl-dKw"
    },
    {
      title: "About a Girl",
      year: 1989,
      description: "Originally appearing on Nirvana's debut album \"Bleach,\" \"About a Girl\" demonstrated Cobain's pop songwriting skills early in his career. The song's Beatles-esque melody and structure set it apart from the heavier grunge sound Nirvana was known for. Its acoustic performance on \"MTV Unplugged\" brought renewed attention to the track, showcasing Cobain's versatility as a songwriter and performer.",
      youtubeEmbed: "deSyLkR6hJo"
    },
    {
      title: "In Bloom",
      year: 1992,
      description: "With its catchy chorus and biting lyrics, \"In Bloom\" takes aim at the bandwagon fans who Cobain felt misunderstood Nirvana's message. The song's powerful dynamics and Cobain's sardonic delivery make it a standout track from the \"Nevermind\" album. Its music video, parodying 1960s variety shows, displays Cobain's dark sense of humor and the band's discomfort with mainstream success.",
      youtubeEmbed: "D742dNm1f8Q"
    },
    {
      title: "Something in the Way",
      year: 1992,
      description: "This haunting, minimalist track from \"Nevermind\" reveals a softer side of Cobain's songwriting. Inspired by a period when Cobain allegedly lived under a bridge, the song's quiet intensity and vivid lyrics showcase his talent for storytelling. Its recent use in popular media has introduced the song to a new generation, cementing its place in Cobain's legacy.",
      youtubeEmbed: "1YhR5UfaAzM"
    },
    {
      title: "Rape Me",
      year: 1993,
      description: "One of Nirvana's most controversial songs, \"Rape Me\" demonstrates Cobain's unflinching approach to difficult subjects. Despite its provocative title, the song is an anti-rape anthem, showcasing Cobain's ability to address serious issues through his music. Its juxtaposition of a gentle intro with explosive choruses epitomizes Nirvana's signature quiet-loud dynamic.",
      youtubeEmbed: "4TsqlT0rfJI"
    },
    {
      title: "Where Did You Sleep Last Night",
      year: 1994,
      description: "While not a Nirvana original, Cobain's rendition of this traditional folk song, performed on \"MTV Unplugged,\" is considered one of his most powerful performances. The raw emotion in Cobain's voice, particularly in the song's final moments, creates an unforgettable and chilling experience. This performance encapsulates Cobain's ability to infuse deep emotion into his music, leaving a lasting impact on listeners.",
      youtubeEmbed: "TfHB9xKoydw"
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
          <h1 className="text-4xl font-bold mb-4">Kurt Cobain</h1>
          <p className="text-xl mb-8">
            Kurt Cobain, the iconic frontman of Nirvana, left an indelible mark on the music world during his brief but explosive career. Born on February 20, 1967, in Aberdeen, Washington, Cobain became the voice of a generation, pioneering the grunge movement and reshaping alternative rock. His raw, emotive vocals, introspective lyrics, and explosive guitar work catapulted Nirvana to global stardom. Despite his tragic death in 1994 at the age of 27, Cobain's influence continues to resonate with musicians and fans alike.
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

export default KurtCobain;