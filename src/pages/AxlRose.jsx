import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const AxlRose = () => {
  const songs = [
    {
      title: "Welcome to the Jungle",
      year: 1987,
      description: "Often considered Guns N' Roses' signature song, \"Welcome to the Jungle\" encapsulates the raw energy and danger of the band's early days in Los Angeles. Axl Rose's opening scream and vivid lyrics paint a picture of urban decay and excess. The song's driving rhythm and Rose's dynamic vocal performance set the standard for hard rock in the late 1980s, announcing Guns N' Roses as a force to be reckoned with in the music world.",
      youtubeEmbed: "UOYMWkSxyn4"
    },
    {
      title: "Sweet Child O' Mine",
      year: 1988,
      description: "With its instantly recognizable guitar intro and Rose's tender-to-fierce vocals, \"Sweet Child O' Mine\" became Guns N' Roses' first and only US number-one single. The song showcases Rose's versatility as a vocalist, from the gentle verses to the powerful chorus. Its more melodic approach helped broaden the band's appeal beyond hard rock audiences, becoming one of the most beloved rock ballads of all time.",
      youtubeEmbed: "5Ko5l_TGI1k"
    },
    {
      title: "November Rain",
      year: 1992,
      description: "An epic power ballad clocking in at nearly nine minutes, \"November Rain\" demonstrates Rose's ambitious songwriting and the band's willingness to push beyond genre boundaries. Rose's emotive vocals and poetic lyrics, combined with sweeping orchestration and Slash's iconic guitar solos, created a rock epic for the ages. Its grandiose music video further cemented the song's legendary status.",
      youtubeEmbed: "Rz6__sLHPNA"
    },
    {
      title: "Paradise City",
      year: 1988,
      description: "With its catchy chorus and high-energy performance, \"Paradise City\" perfectly captures the band's blend of hard rock and punk influences. Rose's vocals soar throughout the track, from the melodic verses to the frenetic finale. The song's optimistic lyrics about an ideal place contrast with the grittier themes often found in Guns N' Roses' music, showcasing Rose's range as a lyricist.",
      youtubeEmbed: "5HSIl2N2-JY"
    },
    {
      title: "Don't Cry",
      year: 1991,
      description: "Part of the ambitious \"Use Your Illusion\" albums, \"Don't Cry\" reveals a more vulnerable side of Axl Rose. The power ballad features some of Rose's most emotional vocal performances, particularly in the song's climactic moments. Its release with two different sets of lyrics (on \"Use Your Illusion I\" and \"II\") demonstrates Rose's meticulous approach to songwriting and his willingness to experiment with conventional song structures.",
      youtubeEmbed: "xJULHB9-8FI"
    },
    {
      title: "Civil War",
      year: 1991,
      description: "One of Guns N' Roses' most politically charged songs, \"Civil War\" showcases Rose's ability to tackle serious subjects. The track's dynamic range, from whispered verses to explosive choruses, allows Rose to display his full vocal capabilities. Its anti-war message and incorporation of sound clips from political speeches and films demonstrate a more mature, socially conscious side of Rose's songwriting.",
      youtubeEmbed: "KuBD8qm6rMI"
    },
    {
      title: "Patience",
      year: 1989,
      description: "This acoustic ballad from \"G N' R Lies\" demonstrates Axl Rose's softer side and the band's versatility. Rose's whistling intro and gentle vocals create an intimate atmosphere, contrasting with the band's harder-edged material. The song's gradual build-up to Rose's signature wail near the end showcases his control and range as a vocalist.",
      youtubeEmbed: "-p-13BHtfHA"
    },
    {
      title: "You Could Be Mine",
      year: 1991,
      description: "Featured in \"Terminator 2: Judgment Day,\" this hard-driving rock song marks a return to Guns N' Roses' grittier roots amidst their more experimental phase. Rose's rapid-fire delivery in the verses and soaring chorus demonstrate his ability to match the song's intense energy. The track's popularity helped bridge the gap between the band's earlier work and their more ambitious \"Use Your Illusion\" era.",
      youtubeEmbed: "qnFU-DxwpRs"
    },
    {
      title: "Estranged",
      year: 1993,
      description: "Another epic from the \"Use Your Illusion\" albums, \"Estranged\" is a deeply personal song for Rose, dealing with themes of isolation and loss. At over nine minutes long, the song takes listeners on an emotional journey, with Rose's vocals conveying a wide range of feelings throughout. Its complexity and emotional depth showcase Rose's growth as a songwriter and vocalist.",
      youtubeEmbed: "dpmAY059TTY"
    },
    {
      title: "Mr. Brownstone",
      year: 1987,
      description: "This gritty track from \"Appetite for Destruction\" addresses the band's struggles with heroin addiction. Rose's sneering vocals and the song's driving rhythm capture the dangerous lifestyle of the early Guns N' Roses days. While perhaps not as well-known as some of their bigger hits, \"Mr. Brownstone\" remains a fan favorite and demonstrates Rose's ability to turn personal demons into compelling rock anthems.",
      youtubeEmbed: "27rKrR424cA"
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
          <h1 className="text-4xl font-bold mb-4">Axl Rose</h1>
          <p className="text-xl mb-8">
            Axl Rose, born William Bruce Rose Jr. on February 6, 1962, in Lafayette, Indiana, is one of rock music's most iconic and controversial figures. As the lead vocalist of Guns N' Roses, Rose helped redefine hard rock in the late 1980s and early 1990s. Known for his distinctive voice, wide vocal range, and electrifying stage presence, Axl Rose has left an indelible mark on the music industry. Despite the band's tumultuous history, Guns N' Roses, led by Rose, has sold over 100 million records worldwide, making them one of the best-selling acts in history.
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

export default AxlRose;