import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const StevieNicks = () => {
  const songs = [
    {
      title: "Edge of Seventeen",
      year: 1981,
      description: "Released as part of her debut solo album \"Bella Donna,\" \"Edge of Seventeen\" became one of Nicks's signature songs. The track's distinctive guitar riff, powerful vocals, and poetic lyrics about loss and resilience have made it an enduring classic. Inspired by the passing of her uncle and John Lennon's death, the song showcases Nick's ability to transform personal experiences into universally relatable music.",
      youtubeEmbed: "3oZunnY-Cbs"
    },
    {
      title: "Landslide",
      year: 1975,
      description: "\"Landslide\" is a beautiful, reflective ballad that has become one of Nicks's most beloved songs. Written during a moment of personal and professional uncertainty, the track's simple guitar melody and heartfelt lyrics resonate with listeners of all ages. Originally recorded with Fleetwood Mac for their self-titled 1975 album, \"Landslide\" has been covered by numerous artists and remains a staple of Nicks's live performances.",
      youtubeEmbed: "Ov1SOhwfbys"
    },
    {
      title: "Dreams",
      year: 1977,
      description: "As Fleetwood Mac's only U.S. number-one hit, \"Dreams\" showcases Nicks's songwriting prowess and ethereal vocals. Written in just 10 minutes, the song emerged from the band's tumultuous period during the recording of \"Rumours.\" Its hypnotic rhythm and Nicks's dreamlike delivery have made it one of the most iconic tracks of the 1970s, experiencing a resurgence in popularity in recent years thanks to social media.",
      youtubeEmbed: "Y3ywicffOj4"
    },
    {
      title: "Rhiannon",
      year: 1975,
      description: "This mystical track about a Welsh witch became one of Fleetwood Mac's signature songs and a staple of Nicks's live performances. Inspired by a novel, Nicks crafted a song that perfectly encapsulates her fascination with mythology and the supernatural. The song's rolling rhythm and Nicks's passionate delivery make \"Rhiannon\" a standout in her extensive catalog.",
      youtubeEmbed: "jQAK6sVovUk"
    },
    {
      title: "Stand Back",
      year: 1983,
      description: "A solo hit inspired by Prince's \"Little Red Corvette,\" \"Stand Back\" features a driving synth line and Nicks's powerful vocals. The song's creation has become legendary, with Prince himself contributing to the track anonymously. Its pulsating rhythm and Nicks's commanding performance made it a dance floor favorite and showcased her ability to adapt to the changing musical landscape of the 1980s.",
      youtubeEmbed: "gwS9BIqbffU"
    },
    {
      title: "Leather and Lace",
      year: 1981,
      description: "This duet with Don Henley of the Eagles highlights Nicks's ability to blend her voice beautifully with other artists. The song's gentle melody and intimate lyrics showcase a softer side of Nicks's vocal range. \"Leather and Lace\" became a Top 10 hit and remains a fan favorite, demonstrating Nicks's versatility as both a solo artist and collaborator.",
      youtubeEmbed: "XfUgbGMTb24"
    },
    {
      title: "Silver Springs",
      year: 1977,
      description: "Originally recorded for Fleetwood Mac's \"Rumours\" album but released as a B-side to \"Go Your Way,\" \"Silver Springs\" has grown in popularity over the years. The song's emotional intensity and Nicks's raw vocal performance make it a standout track. Its exclusion from \"Rumours\" and subsequent rediscovery have made it a beloved part of Nicks's catalog, showcasing her ability to create timeless music even with songs that were initially overlooked.",
      youtubeEmbed: "eDwi-8n054s"
    },
    {
      title: "Gypsy",
      year: 1982,
      description: "Another Fleetwood Mac hit, \"Gypsy\" combines Nicks's poetic lyrics with the band's signature sound. The song's nostalgic theme, looking back at simpler times, resonates with many listeners. Its music video was groundbreaking for its time, being one of the most expensive ever made. \"Gypsy\" demonstrates Nicks's storytelling prowess and her ability to create vivid imagery through her music.",
      youtubeEmbed: "mwgg1Pu6cNg"
    },
    {
      title: "Stop Draggin' My Heart Around",
      year: 1981,
      description: "A collaboration with Tom Petty and the Heartbreakers, this song became Nicks's highest-charting solo hit. The track's rock edge and the vocal interplay between Nicks and Petty create a powerful dynamic. Originally written for Tom Petty's band, the song found its perfect home with Nicks, showcasing her ability to make any song her own and her talent for successful collaborations.",
      youtubeEmbed: "H5i7j0VhEHw"
    },
    {
      title: "Seven Wonders",
      year: 1987,
      description: "This Fleetwood Mac track from \"Tango in the Night\" features Nicks's distinctive vocals and mystical lyrics. While not written entirely by Nicks, her contributions to the lyrics and her passionate delivery made it a fan favorite. The song's upbeat tempo and catchy chorus demonstrate Fleetwood Mac's evolution into the late 1980s while maintaining Nicks's signature style. Its recent feature in popular media has introduced it to a new generation of listeners.",
      youtubeEmbed: "9b4F_ppjnKU"
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
          <h1 className="text-4xl font-bold mb-4">Stevie Nicks</h1>
          <p className="text-xl mb-8">
            Stevie Nicks, the legendary "Queen of Rock and Roll," has been enchanting audiences for over five decades with her mesmerizing voice and poetic lyrics. Born on May 26, 1948, in Phoenix, Arizona, Nicks rose to fame as a member of Fleetwood Mac before launching a successful solo career. Her unique style, both musically and visually, has made her an icon in the music industry. Stevie Nicks has solidified her place in music history with multiple Grammy nominations, an induction into the Rock and Roll Hall of Fame (twice!), and over 140 million records sold worldwide.
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

export default StevieNicks;