import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const KidzBop = () => {
  const songs = [
    {
      title: "Dance Monkey",
      year: 2020,
      description: "\"Dance Monkey\" is a song originally by Tones and I, and Kidz Bop is known for creating family-friendly versions of popular songs. The Kidz Bop rendition maintains the catchy melody and energetic vibe of the original while adapting the lyrics to be suitable for a younger audience.",
      youtubeEmbed: "FiXCxfWWwPo"
    },
    {
      title: "Old Town Road",
      year: 2019,
      description: "Kidz Bop Kids' rendition of \"Old Town Road,\" originally by Lil Nas X featuring Billy Ray Cyrus, transforms the chart-topping country-rap hit into a kid-friendly anthem. Released as part of their series of family-friendly covers, Kidz Bop maintains the catchy melody and infectious energy of the original while adapting the lyrics to ensure appropriateness for a younger audience. The Kidz Bop Kids bring their youthful enthusiasm to the song, creating a playful version that resonates with children and families.",
      youtubeEmbed: "yYPNrg-s-NI"
    },
    {
      title: "KIDZ BOP Shuffle",
      year: 2014,
      description: "Kidz Bop Shuffle song was released in 2014 and taken in Dreamworks Studio. Kids both dance and sing the shuffle song, creating an energetic and fun performance that showcases the group's ability to entertain and engage young audiences.",
      youtubeEmbed: "QfzRP6V5rE4"
    },
    {
      title: "Fight Song",
      year: 2015,
      description: "\"Fight Song,\" originally recorded by American singer and songwriter Rachel Platten, was released as a single by Columbia Records on February 19, 2015. The empowering anthem became a massive hit, serving as the lead single on Platten's extended play (EP) titled \"Fight Song\" (2015) and as the lead single on her major label debut studio album, \"Wildfire\" (2016). Co-written by Platten and Dave Bassett, the song resonates with themes of resilience and self-empowerment. Kidz Bop Kids, known for creating family-friendly versions of popular songs, has also covered \"Fight Song,\" adapting the lyrics to maintain a child-friendly atmosphere while preserving the song's uplifting spirit for a younger audience.",
      youtubeEmbed: "40uEcTuqIvM"
    },
    {
      title: "Havana",
      year: 2018,
      description: "In their rendition of \"Havana,\" originally by Camila Cabello featuring Young Thug, the Kidz Bop Kids bring a youthful and vibrant energy to the Latin-inspired pop hit. This family-friendly adaptation maintains the catchy melody and rhythm of the original while featuring age-appropriate lyrics. The Kidz Bop Kids infuse the song with their own charm, creating a version that is both enjoyable for young listeners and reflective of the playful themes in the original track. With lively vocals and a spirited delivery, the Kidz Bop Kids make \"Havana\" a fun and engaging musical experience for a younger audience, showcasing their talent for reimagining popular songs in a way that resonates with kids and families.",
      youtubeEmbed: "8OXf3ufjOsM"
    },
    {
      title: "Call Me Maybe",
      year: 2012,
      description: "Kidz Bop Kids' rendition of \"Call Me Maybe\" brings a kid-friendly twist to Carly Rae Jepsen's infectious pop hit. Known for their family-friendly adaptations, the Kidz Bop Kids infuse the song with their youthful energy and enthusiasm. The lyrics are carefully reworked to maintain a child-appropriate theme while retaining the playful essence of the original. This version captures the innocence and excitement of a crush, making it relatable and entertaining for young listeners.",
      youtubeEmbed: "_bSZUcL5Hmk"
    },
    {
      title: "Best Day Of My Life",
      year: 2014,
      description: "Kidz Bop Kids' version of \"Best Day of My Life\" infuses the upbeat and optimistic anthem with youthful exuberance and positivity. Originally by American Authors, the Kidz Bop Kids bring their energetic vocals to create a rendition that resonates with a younger audience. The lyrics are thoughtfully adapted to maintain a family-friendly atmosphere, ensuring that the feel-good message of the song remains intact. This rendition captures the essence of cherishing special moments and embracing the joy of the present, making it a perfect soundtrack for kids' celebrations and carefree adventures.",
      youtubeEmbed: "sNog54ovi8Q"
    },
    {
      title: "FRIENDS",
      year: 2018,
      description: "In their rendition of \"FRIENDS,\" originally performed by Marshmello and Anne-Marie, the Kidz Bop Kids bring a youthful charm to the catchy and upbeat pop track. Known for their family-friendly adaptations of popular songs, the Kidz Bop Kids infuse this rendition with their distinctive energy, making it both relatable and entertaining for a younger audience. The lyrics are carefully modified to ensure appropriateness for children, yet the essence of the original song's themes of friendship and camaraderie remains intact.",
      youtubeEmbed: "HQl-agd384E"
    },
    {
      title: "Best Day of My Life",
      year: 2014,
      description: "Kidz Bop Kids' rendition of \"Best Day of My Life\" transforms the upbeat and optimistic anthem originally by American Authors into a celebration perfectly suited for a younger audience. With their energetic and youthful vocals, the Kidz Bop Kids infuse the song with a sense of joy and excitement, making it a perfect soundtrack for a carefree and happy day. The lyrics are thoughtfully modified to maintain a family-friendly atmosphere, allowing children to connect with the song's positive message.",
      youtubeEmbed: "yss0SGzrUIY"
    },
    {
      title: "Uptown Funk",
      year: 2015,
      description: "The Kidz Bop Kids' rendition of \"Uptown Funk\" is a lively and kid-friendly adaptation of the hit song originally performed by Mark Ronson featuring Bruno Mars. Released as part of one of their compilation albums, the Kidz Bop Kids bring their youthful energy to this infectious and groovy track. With carefully curated lyrics to ensure age-appropriateness, the group delivers a spirited performance that captures the essence of the original while making it suitable for a younger audience. The vibrant and playful atmosphere created by the Kidz Bop Kids in their version of \"Uptown Funk\" makes it a popular choice among families looking for music that can be enjoyed by both children and parents alike.",
      youtubeEmbed: "ohqYQG-TIas"
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
          <h1 className="text-4xl font-bold mb-4">Kidz Bop</h1>
          <p className="text-xl mb-8">
            Kidz Bop, established in 2001 by Razor & Tie co-founders Cliff Chenfeld and Craig Balsam, has emerged as a prominent children's music group and brand that specializes in creating family-friendly renditions of popular songs. The concept revolves around producing compilation albums featuring children singing sanitized versions of contemporary pop hits that often dominate the Billboard Hot 100 and receive extensive airplay on mainstream radio. The Kidz Bop covers are carefully crafted to feature clean and censored lyrics, replacing any profanity with more age-appropriate language. Despite the efforts to create child-friendly adaptations, some critics argue that this approach may not entirely eliminate the adult themes present in the original music.
          </p>
          <p className="text-xl mb-8">
            Since its inception, Kidz Bop has enjoyed significant commercial success, selling over 21 million albums and accumulating more than 4.5 billion streams. The brand's appeal extends beyond albums, with Kidz Bop diversifying its offerings to include merchandise, music videos, a live touring division, and talent search competitions. The live performances allow young talents to showcase their skills and engage with audiences in a family-friendly environment. Kidz Bop's multifaceted approach has not only contributed to its commercial triumph but has also established it as a cultural phenomenon that resonates with families seeking entertainment options that cater to a younger audience without compromising on the enjoyment of popular music.
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

export default KidzBop;