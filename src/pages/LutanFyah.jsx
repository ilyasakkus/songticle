import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const LutanFyah = () => {
  const songs = [
    {
      title: "Weed Oooooh",
      year: 2023,
      description: "In an audacious symphony that swirls through the air like fragrant smoke, Lutan Fyah unveils \"Weed Oooooh\" - a reggae revelation that elevates the senses and sparks a sensory journey like no other. With the ethereal charm of his vocals, the Jamaican luminary weaves an enchanting ode to the mystical herb, celebrating its power to transcend boundaries and ignite the imagination. Backed by an intoxicating rhythm that lingers like a hazy dream, \"Weed Oooooh\" becomes an invitation to embrace euphoria and escape the constraints of everyday life. Lutan Fyah's lyrical prowess is on full display as he crafts a poetic narrative of liberation, where inhibitions melt away, and a euphoric harmony unites kindred spirits. In this captivating composition, \"Weed Oooooh\" emerges as an anthem of unapologetic self-expression, leaving reggae aficionados craving for more of its transcendent magic.",
      youtubeEmbed: "i9SdGSC8jQQ"
    },
    {
      title: "Spliff Tail",
      year: 2022,
      description: "In a reggae revelation that sparks a euphoric blaze, Lutan Fyah ignites the airwaves with \"Spliff Tail\" - an infectious melody that beckons listeners into a hypnotic trance. With his signature velvety vocals and lyrical finesse, the Jamaican sensation rolls out an ode to freedom and liberation, wrapped in the embrace of the beloved spliff. Backed by a magnetic rhythm that pulses through the veins, \"Spliff Tail\" becomes a rhythmic ritual, inviting us to surrender to the soothing haze of the moment. Lutan Fyah's artistry knows no bounds as he paints a vivid soundscape of euphoria, where carefree spirits unite and the burdens of the world vanish into a haze of good vibes. A celebration of life and self-discovery, \"Spliff Tail\" stands as an anthem of liberation that ignites the hearts of reggae enthusiasts, beckoning them to join this intoxicating musical journey.",
      youtubeEmbed: "A02ZeHHQhZM"
    },
    {
      title: "Good Vibes",
      year: 2021,
      description: "\"Good Vibes\" - a transcendent masterpiece that transports listeners to a realm of pure euphoria, courtesy of the inimitable Lutan Fyah. With the mesmerizing allure of his velvety vocals, the Jamaican luminary weaves an enchanting tapestry of positivity and joy, inviting us to embrace the radiant energy of life. Set against a backdrop of pulsating reggae rhythms, \"Good Vibes\" serves as an uplifting anthem that celebrates the beauty of unity and love. Through soul-stirring lyricism, Lutan Fyah curates a musical sanctuary where all worries dissipate, replaced by an overwhelming sense of optimism and harmony. A true testament to his artistry, \"Good Vibes\" transcends mere sound, evoking a kaleidoscope of emotions that resonate within the very core of our being, leaving an indelible mark on our souls and a longing for an eternal encore.",
      youtubeEmbed: "K5AeYsF-d9I"
    },
    {
      title: "Criminal",
      year: 2020,
      description: "In a groundbreaking collaboration that electrifies the reggae landscape, Lutan Fyah and Turbulence unite their magnetic forces to unveil \"Criminal\" - a soul-stirring anthem that transcends genre boundaries and ignites the spirit. The Jamaican virtuosos intertwine their powerful vocals, weaving a narrative that confronts the social injustices and systemic oppression that plague our world. With poetic lyricism and emotive delivery, \"Criminal\" emerges as a rallying cry for change, urging listeners to stand up against the injustices that permeate society. Backed by an intoxicating rhythm that sets the stage for rebellion, this fearless fusion of reggae prowess delivers a message that echoes long after the last note fades. Lutan Fyah and Turbulence's \"Criminal\" stands as an unforgettable testament to the unifying power of music, paving the way for a harmonious revolution that demands justice and equality for all.",
      youtubeEmbed: "71qoLvXcUsU"
    },
    {
      title: "Bossman",
      year: 2019,
      description: "Lutan Fyah emerges as the \"Bossman\" in his latest chart-topping sensation. With a commanding presence and unrivaled vocal prowess, the Jamaican maestro reigns supreme, painting an arresting portrait of strength and leadership. Backed by infectious rhythms and an irresistible groove, \"Bossman\" exudes an air of undeniable confidence, empowering audiences to embrace their inner resilience and take charge of their destinies. This trailblazing anthem transcends mere music, becoming a powerful call to action in a world yearning for guidance and inspiration. Lutan Fyah's \"Bossman\" is a triumphant ode to self-empowerment, etching his name in the annals of reggae history and leaving listeners captivated by the magnetic charm of his musical supremacy.",
      youtubeEmbed: "KLYzyQwUdbk"
    },
    {
      title: "Perfect Storm",
      year: 2018,
      description: "Prepare to be swept away by the force of Lutan Fyah's latest musical tempest, \"Perfect Storm.\" The Jamaican sensation returns with a captivating reggae revelation that fuses his signature soulful vocals with electrifying rhythms, delivering an aural journey like no other. As the lyrics cascade with poetic prowess, \"Perfect Storm\" delves into the complexities of human emotions, exploring love's turbulent waters and the unyielding pursuit of passion. With each verse, Lutan Fyah unveils the stormy seas of relationships, embracing vulnerability and resilience in a mesmerizing dance of lyrical prowess.",
      youtubeEmbed: "xzRD82ygsoA"
    },
    {
      title: "Fake Friend",
      year: 2017,
      description: "Introducing \"Fake Friend\" - Lutan Fyah's latest soul-stirring revelation that confronts the treacherous world of disloyalty and deceit within friendships. In this compelling reggae melody, the Jamaican virtuoso exposes the raw emotions of hurt and disappointment, inviting listeners to contemplate their own encounters with faux companions. With his poignant storytelling and captivating vocal prowess, Lutan Fyah's \"Fake Friend\" strikes an emotive chord, challenging us to treasure the essence of true bonds amidst the precarious webs of duplicity. This riveting composition is an authentic testimony to the artist's ability to evoke genuine emotion and remind us that amidst life's chaos, the search for authenticity remains the ultimate melody.",
      youtubeEmbed: "QRUai1TpJlY"
    },
    {
      title: "Let Me Be",
      year: 2016,
      description: "Following the resounding success of his widely acclaimed tracks \"Bossman\" and \"Criminal,\" which together garnered over 6.5 million views on YouTube, Lutan Fyah presents \"Let Me Be\" - a powerful and inspiring song that resonates with listeners on a deeply personal level. The track delivers a message of self-belief and the pursuit of dreams, set to the signature rub-a-dub sound of Montreal-based Riddim Wise. With his distinctive vocals and emotive delivery, Lutan Fyah's \"Let Me Be\" exudes positivity and empowerment, uplifting audiences and sound systems around the globe. Backed by Riddim Wise's infectious rhythms, the song creates an unforgettable fusion of soulful reggae and motivating lyrics, making it an anthem for those who dare to chase their aspirations. \"Let Me Be\" is a beacon of hope, encouraging listeners to embrace their inner strength and fearlessly pursue their goals, promising to leave a lasting impact on hearts and minds worldwide.",
      youtubeEmbed: "pBhQLCDp3uU"
    },
    {
      title: "Still Dre - Special Dubplate for Irie Ites",
      year: 2015,
      description: "\"Still Dre\" is a classic hip-hop track originally performed by Dr. Dre, featuring Snoop Dogg. Released in 1999 as part of Dr. Dre's iconic album \"2001,\" the song remains a timeless anthem in the genre. With its infectious and instantly recognizable piano riff, \"Still Dre\" exudes a sense of confidence and triumph, reflecting Dr. Dre's rise to fame and success in the music industry. And Lutan Fyah sings a cover of this song.",
      youtubeEmbed: "ItSyGn7pUV0"
    },
    {
      title: "I Feel The Pain",
      year: 2014,
      description: "\"I Feel The Pain\" is a soulful reggae track by Jamaican musician Lutan Fyah, expressing universal emotions of suffering and resilience. With his raspy and emotive vocals, Lutan Fyah masterfully weaves a poignant narrative that transcends cultural boundaries, leaving a lasting impression on listeners. The song's touching lyrics and soothing rhythms showcase his commitment to using music as a powerful medium to evoke empathy and address social issues, solidifying his position as a captivating voice in the reggae genre.",
      youtubeEmbed: "hn-zb3ERJq0"
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
          <h1 className="text-4xl font-bold mb-4">Lutan Fyah</h1>
          <p className="text-xl mb-8">
            In the lush heartlands of reggae's birthplace, Jamaica, the captivating sounds of Lutan Fyah echo, leaving an indelible mark on the music world. Born as Anthony Martin, this Jamaican musician, singer, and devout member of the Rastafari movement Bobo Shanti has emerged as a powerful voice of social consciousness and spiritual awakening through his soul-stirring compositions. With roots firmly planted in Spanish Town, Saint Catherine Parish, Jamaica, Lutan Fyah's artistic journey traces an intriguing path. Initially pursuing architecture at the University of Technology and dabbling in professional football for Constant Spring F.C., he eventually found his true calling in music.
          </p>
          <p className="text-xl mb-8">
            Under the stage name Lutan Fyah, he embarked on a soaring career in 1999, recording his early tracks for Buju Banton's Gargamel Records. Over the years, his magnetic vocals and profound lyricism have earned him collaborations with renowned artists, spanning genres and continents. From electrifying singles to powerful covers of iconic tracks, Lutan Fyah's repertoire has solidified his status as a reggae luminary and a revered figure in the global music scene.
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

export default LutanFyah;