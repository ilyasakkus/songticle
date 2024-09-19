import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const JoniMitchell = () => {
  const songs = [
    {
      title: "River",
      year: 1971,
      description: "Joni Mitchell's \"River\" is a crystalline reflection of heartache, a poetic tapestry woven with bittersweet notes that resonate like the echo of a winter's sigh. Nestled within her 1971 masterpiece \"Blue,\" the song's haunting piano melodies embrace the listener in a tender embrace, capturing the essence of longing and love's lament. While born from the embers of a broken romance, \"River\" transcends its origins, becoming a poignant anthem of emotional release. As Mitchell's voice dances delicately upon the keys, the song's connection to the holiday season adds an unexpected layer of depth, transforming it into a modern Christmas classic. Like a timeless carol of the soul, \"River\" invites us to navigate the currents of heartache and healing, a serenade that shimmers with the enduring allure of Joni Mitchell's artistry.",
      youtubeEmbed: "OLHxxBTl71I"
    },
    {
      title: "Big Yellow Taxi",
      year: 1970,
      description: "Joni Mitchell's \"Big Yellow Taxi\" is a timeless musical tapestry, woven with her signature poetic finesse. Bursting forth from the soul of her 1970 album \"Ladies of the Canyon,\" the song's lilting melodies and candid lyrics encapsulate a poignant commentary on humanity's relationship with nature. With a breezy charm, Mitchell's voice dances like a sunbeam across the canvas of her guitar strings, inviting us to ponder the profound message nestled within the song's deceptively catchy cadence. A hit that traversed the globe, \"Big Yellow Taxi\" evolved through the years, finding new life in the hands of fellow artists like Counting Crows and Amy Grant. This musical gem, with its evocative imagery and infectious chorus, remains an enduring testament to Joni Mitchell's unparalleled ability to craft melodies that resonate as both a mirror to society and a timeless soundtrack for introspection.",
      youtubeEmbed: "2595abcvh2M"
    },
    {
      title: "Blue (Full Album)",
      year: 1971,
      description: "Joni Mitchell's \"Blue\" is a mesmerizing opus, a sonic journey through the intricate labyrinth of emotions. Released in 1971, this masterpiece stands as a testament to Mitchell's unparalleled artistry, a canvas upon which her heartache, vulnerability, and introspection are painted in vivid hues. With a voice that glides like silk, Mitchell's poetic narratives encapsulate the tumultuous landscapes of love and life. The album's gentle melodies, often adorned with just the tender strums of a guitar or the soft caress of a piano, create an intimate sanctuary where listeners are invited to navigate the labyrinth of human connections. \"Blue\" is a symphony of heartbreak and hope, a musical alchemy that transforms personal experiences into universal anthems. It's no wonder that it has earned its place among the pantheon of musical legends, a cherished treasure that continues to resonate across generations, a timeless testament to the power of raw, unfiltered expression.",
      youtubeEmbed: "MvR7Dkg4NQU"
    },
    {
      title: "Both Sides Now",
      year: 1969,
      description: "Joni Mitchell's \"Both Sides, Now\" is a serenade to the ebb and flow of life's tapestry, a sonic masterpiece that resonates like an eternal sigh. Originally brought to life by Judy Collins in 1968, the song found its ethereal home on Mitchell's 1969 album \"Clouds,\" etching its poetic imprint in the annals of music history. Mitchell's crystalline vocals, like gossamer threads, weave through the melody, breathing life into poignant reflections on perception and experience. The song's enduring allure has proven timeless, echoing through the decades with a resonance that remains unmatched. A symphony of emotion, \"Both Sides, Now\" has transcended its origins to become an anthem of introspection and wisdom, a melody that gracefully dances through the hearts of listeners like a gentle waltz with the universe.",
      youtubeEmbed: "yXr2EFomFkU"
    },
    {
      title: "A Case Of You",
      year: 1971,
      description: "Joni Mitchell's \"A Case of You,\" a gem from her iconic 1971 album \"Blue,\" is an enchanting tapestry of vulnerability and poetic prowess. Crafted with a poetic elegance that defines her artistry, the song unfurls as a musical confession, a portrait of love's intoxicating allure. Mitchell's dulcet tones, accompanied by the gentle strumming of James Taylor's acoustic guitar, weave a spell that transcends time. A mesmerizing blend of folk and introspection, \"A Case of You\" captures the essence of emotional intricacies and fleeting connections. As Mitchell's voice dances with the delicate notes of the dulcimer, listeners are drawn into a realm where every heartfelt lyric paints a picture of raw intimacy. The song's exquisite tapestry, adorned with allusions to Shakespearean classics and poetic inspiration, solidifies \"A Case of You\" as a masterful ode to the complexities of love's embrace, a haunting melody that lingers like a wistful memory.",
      youtubeEmbed: "qAZp5JfDmz4"
    },
    {
      title: "House Of The Rising Sun",
      year: 1974,
      description: "In Joni Mitchell's rendition of \"House of the Rising Sun,\" a transformative alchemy unfolds as the iconic folk ballad undergoes an ethereal metamorphosis through her hauntingly evocative voice. With every note, Mitchell weaves a mesmerizing tapestry, infusing this timeless classic with her signature emotive depth. The song's familiar narrative of longing and redemption is elevated to new heights as Mitchell's unique musical lens casts a spell, transporting listeners into a realm where tradition dances with innovation. Her rendition is a haunting reverie, an enigmatic journey through the corridors of history, rendered anew with a touch of ineffable magic.",
      youtubeEmbed: "4wWR3ZkyyGY"
    },
    {
      title: "You Turn Me On I'm A Radio",
      year: 1972,
      description: "Joni Mitchell's \"You Turn Me On, I'm a Radio\" is a sonic masterpiece that effortlessly melds lyrical enchantment with melodic prowess. Emerging from the echoes of her creative journey, the song resonates as a vibrant response to the music industry's clamor for chart-topping hits. Mitchell's velvet voice weaves a spell, inviting listeners into a world where radio waves carry not just music, but the essence of a tantalizing connection. Set against the backdrop of Hollywood's A&M Studios, the song's recording session saw harmonious contributions from musical luminaries like Graham Nash, David Crosby, and Neil Young. While only Nash's harmonica made it onto the final track, the song itself soared to become a resounding success. \"You Turn Me On, I'm a Radio\" marked a pivotal moment in Mitchell's career, capturing love's essence with her signature poetic flair. It's a sensationally lyrical testament to Mitchell's artistry, a harmonious embrace that effortlessly ignites hearts and airwaves alike.",
      youtubeEmbed: "JP1hEPRYBQs"
    },
    {
      title: "Carey",
      year: 1971,
      description: "\"Carey,\" a melodious gem nestled within Joni Mitchell's 1971 masterpiece \"Blue,\" is a musical postcard infused with the sun-soaked spirit of a bygone adventure. Inspired by Mitchell's sojourn to the mesmerizing Greek island of Crete, the song dances to the rhythm of a carefree heart and the echoes of a serendipitous encounter. Against the backdrop of Matala's enchanting caves and sun-drenched shores, Mitchell's lyrical brushstrokes paint a vivid portrait of a red-haired rogue named Cary Raditz, whose essence becomes woven into the very fabric of the melody. With a voice as gentle as the Mediterranean breeze, Mitchell croons tales of laughter and longing, crafting an auditory tapestry that captures the essence of a fleeting, yet unforgettable, connection. \"Carey\" is more than a song; it's a sunlit reverie, a harmonious keepsake from a chapter of escapades and introspection, a melody that beckons listeners to join in the timeless chorus of wanderlust and whimsy.",
      youtubeEmbed: "wfZJ6sHeA6k"
    },
    {
      title: "All I Want",
      year: 1971,
      description: "In the timeless ballad \"All I Want,\" found within Joni Mitchell's iconic album \"Blue\" a symphony of emotions unfolds like a carefully crafted couture gown. With lyrical finesse that could rival the strokes of a master painter, Mitchell captures the essence of longing, vulnerability, and the intricate dance of human connection. The song, a glimpse into the artist's heart, bears the weight of a relationship's intricacies, infusing it with a raw authenticity that resonates beyond time's constraints. Mitchell's mellifluous voice dances upon a tapestry of open-tuned guitar, weaving a melody that wraps itself around the soul like a luxurious silk shawl. \"All I Want\" is a confessional serenade, an ode to love's complexities, and a sonic embodiment of Mitchell's prowess as a lyrical enchantress. In each note and phrase, she unveils the delicate threads of her emotions, inviting listeners to immerse themselves in the melodious world she has woven, a world where every heartache and every whisper of desire is etched with a poetic grace that only Joni Mitchell can conjure.",
      youtubeEmbed: "r6NZ_2TuLf8"
    },
    {
      title: "California",
      year: 1971,
      description: "Joni Mitchell's \"California,\" an enchanting ballad nestled within her 1971 masterpiece \"Blue,\" serves as a poignant encapsulation of longing and wanderlust. Penned during her sojourn in France, the song resonates with a profound ache for the vibrant embrace of California's creative haven, a sentiment shared by many free spirits of the counterculture era. With a lyrical finesse akin to a master painter's brushstrokes, Mitchell weaves a tapestry of her European escapades – a meandering voyage through Spain and a sojourn on a Greek isle. Yet, beneath these vivid chronicles lies a constant refrain, an echoing chorus of yearning for the Golden State's welcoming shores. The stream of consciousness narrative technique, reminiscent of her other travelogue-like composition \"Carey,\" unfurls with an effortless elegance, inviting the listener into Mitchell's world of introspection and emotional geography. \"California\" stands not only as an ode to a specific place but as a universal ode to the ceaseless tug of heartstrings that links the wandering soul to the horizon of their dreams. It's a testament to Mitchell's artistic prowess that she could paint such a vivid canvas of sentiment, allowing us all to journey alongside her in pursuit of the sun-kissed sanctuary that is \"California.\"",
      youtubeEmbed: "l6tlDUqRMUo"
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
          <h1 className="text-4xl font-bold mb-4">Joni Mitchell</h1>
          <p className="text-xl mb-8">
            Joni Mitchell's musical legacy is an exquisite tapestry woven with poignant lyricism and daring innovation. As a trailblazing Canadian-American singer-songwriter, her influence radiates through the annals of music history. Mitchell's indelible mark on the folk scene of the 1960s blossomed into a kaleidoscope of genres, merging pop, jazz, and rock into her sonic palette. A maestro of the heartstrings, Mitchell's compositions are emotive masterpieces that have left an indelible mark on the canvas of sound.
          </p>
          <p className="text-xl mb-8">
            At the pinnacle of her artistry lies a collection of songs that transcend time. Her opus includes gems like "Both Sides, Now," "Big Yellow Taxi," and "A Case of You," each a testament to her lyrical prowess and musical innovation. Mitchell's journey through folk, pop, and jazz has produced timeless classics that continue to resonate with audiences across generations.
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

export default JoniMitchell;