import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const IceSpice = () => {
  const songs = [
    {
      title: "Princess Diana (Lyric) - Bonus",
      year: 2023,
      description: "\"Princess Diana\" stands as a compelling musical offering from the talented American rapper Ice Spice, featured as the second track on her debut extended play, Like..?. Released on January 20, 2023, under the labels 10K Projects and Capitol Records, the song quickly gained popularity for its unique blend of rhythm and lyricism. The remix, featuring the iconic Nicki Minaj, added another layer of dynamism to the track when it was released as a single on April 14, 2023. This collaboration proved to be a resounding success, as the remix soared to number four on the prestigious Billboard Hot 100 chart. The achievement marked Ice Spice's second top-ten hit and contributed to Nicki Minaj's impressive repertoire, securing her 22nd top-ten hit on the same chart. \"Princess Diana\" showcases the prowess of both artists, leaving an indelible mark on the contemporary rap music landscape.",
      youtubeEmbed: "Bv-rUf7I_sw"
    },
    {
      title: "Princess Diana",
      year: 2023,
      description: "\"Princess Diana\" reigns as a regal masterpiece from the illustrious Ice Spice, gracing her debut extended play, Like..?, with an air of undeniable allure. Released on January 20, 2023, through 10K Projects and Capitol Records, the track swiftly soared to the summits of musical glory, even earning a formidable remix with none other than rap icon Nicki Minaj, which skyrocketed to number four on the Billboard Hot 100. The EP's opening song served as a captivating introduction to Ice Spice's extraordinary talent, and her performance at Rolling Loud California in March 2023 only solidified her ascent to greatness. Onstage, she eloquently expressed her admiration for the legendary Lil Wayne and her idol Nicki Minaj, both of whom had graced the same platform just before her, leaving the audience spellbound by her radiant energy and infectious enthusiasm. With \"Princess Diana,\" Ice Spice exudes a majesty that firmly establishes her as a force to be reckoned with in the realm of contemporary rap, carving her path towards an exhilarating reign of musical dominance.",
      youtubeEmbed: "gMq-I0dejjE"
    },
    {
      title: "in ha mood",
      year: 2023,
      description: "\"In Ha Mood\" radiates with the magnetic charm of Ice Spice, as the American rapper delivers a mesmerizing anthem that captures the essence of independence and self-assuredness. Released on January 6, 2023, through 10K Projects and Capitol Records, the song's anticipation was sparked by a tantalizing TikTok teaser, amassing fervent views from fans. Produced by her regular collaborator RiotUSA, with co-production by CEO Mark Savage, the track showcases Ice Spice's signature lyrical prowess as she eloquently navigates the complexities of a man vying for her attention. With a confident flair, Ice Spice stands her ground, unyielding in her pursuit of enjoying life to the fullest, despite his pleas to stay. The rapper's unapologetic authenticity shines through, leaving listeners captivated by her unfaltering popularity and her remarkable ability to seize control outside her comfort zone.",
      youtubeEmbed: "RIJbCb1KrOk"
    },
    {
      title: "No Clarity",
      year: 2023,
      description: "\"No Clarity\" by Ice Spice delves into the tumultuous depths of a relationship marred by betrayal and heartache. Through emotive and assertive lyrics, Ice Spice questions why they are mistreated despite their innocence, even suggesting that they may have slept with their partner's brother, leading to the conflict. With unapologetic dominance, the rapper asserts their worth and power, proclaiming themselves as the one in control. The first verse reflects the partner's panic in the presence of Ice Spice, highlighting the speaker's commanding presence. Ice Spice's refusal to tolerate infidelity is evident, as they assert their resilience despite past struggles, leaving listeners captivated by the raw vulnerability and unwavering strength that define this gripping musical narrative.",
      youtubeEmbed: "U77JyALAfk0"
    },
    {
      title: "Name of Love",
      year: 2023,
      description: "\"Name of Love\" stands as a poignant and emotionally charged ballad that delves into the complexities of a tumultuous romantic relationship, exploring themes of mistrust, betrayal, and heartache. Ice Spice's evocative lyrics express a deep sense of frustration and disappointment towards a partner who may not be fully committed or faithful, while unapologetically acknowledging their own worth and refusing to settle for anything less than they deserve. The chorus serves as a powerful reflection of the singer's emotional independence, where they eloquently convey their willingness to give love, yet not at the cost of receiving the same in return. Emphasizing the weight and significance of their emotions, Ice Spice asserts their right to be treated with the respect and sincerity they deserve, leaving listeners moved by the raw vulnerability and strength woven into this captivating musical masterpiece.",
      youtubeEmbed: "9MGt2N-q_2Y"
    },
    {
      title: "Euphoric",
      year: 2023,
      description: "\"Euphoric\" emerges as a fiercely self-confident and unapologetic anthem that cements Ice Spice's status as a trailblazing female rapper. With unyielding pride, she proclaims her triumphs and success, fearlessly asserting that shattering expectations is merely a hobby for her. The track exudes an air of empowerment as Ice Spice revels in her euphoric state, unshaken by anyone's attempts to bring her down. Seamlessly weaving in references to Whitney Houston and Bobby Brown's tumultuous relationship, she draws parallels to her own experiences with a man addicted to her, asserting her unassailable control in her relationships. With brazen lyricism, Ice Spice boasts of making men forfeit while unabashedly embracing her love for smoking marijuana and surrounding herself with beautiful women. Emphatically declaring herself as the baddest rapper in her city, she eschews luck in her pursuit of success, leaving no doubt about her unwavering determination.",
      youtubeEmbed: "Hjoqr2_-Fhw"
    },
    {
      title: "Gangsta Boo",
      year: 2023,
      description: "\"Gangsta Boo\" emerges as a scintillating drill anthem that marks a defining moment in Ice Spice's musical journey. As one of the three new tracks featured on her highly anticipated debut extended play, \"Like..?\" (2023), the song boasts a star-studded collaboration with none other than the talented American rapper Lil Tjay. Emanating irresistible energy, \"Gangsta Boo\" ingeniously draws upon the classic sample of \"I Need a Girl (Part Two)\" (2002) by P. Diddy and Ginuwine, featuring Loon, Mario Winans, and Tammy Ruggieri. The fusion of drill beats with the iconic melody lends the track an air of nostalgia, juxtaposed against Ice Spice and Lil Tjay's inimitable lyrical prowess, resulting in an electrifying sonic experience. With her signature unapologetic style, Ice Spice effortlessly navigates themes of strength, authenticity, and street finesse, while Lil Tjay's verses infuse the track with his own unique flair.",
      youtubeEmbed: "_4gcXoXz4H0"
    },
    {
      title: "Actin A Smoochie",
      year: 2023,
      description: "\"Actin A Smoochie\" epitomizes Ice Spice's unwavering commitment to self-empowerment, creating a dazzling soundscape that celebrates individuality, confidence, and unapologetic desire. With its bold and vibrant lyricism, the song masterfully unravels the intricacies of modern dating, urging listeners to reclaim their agency and unapologetically pursue pleasure on their own terms. Ice Spice's opening lines reverberate with electric energy, instantly captivating the audience's attention, as she fearlessly declares herself a \"baddie\" - an unyielding force to be reckoned with. Embracing her strength and sensuality, the rapper defies societal norms and unashamedly takes control of her own narrative. With a fierce and infectious rhythm that compels the body to move, \"Actin A Smoochie\" emerges as an anthem of liberation and self-affirmation, solidifying Ice Spice's position as a trailblazing artist who unapologetically owns her truth and invites others to do the same.",
      youtubeEmbed: "EbuHMZdXMIo"
    },
    {
      title: "Bikini Bottom",
      year: 2022,
      description: "With \"Bikini Bottom,\" Ice Spice unleashes a whirlwind of creative brilliance, channeling her artistic ingenuity to craft a musical gem that transcends the boundaries of conventional rap. Released on October 28, 2022, under the esteemed record label 10K Projects, this track stands as a testament to Ice Spice's magnetic talent and playful spirit. The rapper first took the world by storm with her viral debut single \"Munch (Feelin' U)\" propelling her into the limelight and capturing the attention of the industry's finest. As Ice Spice smoothly raps over the captivating beat, courtesy of the masterful RiotUSA, one cannot help but marvel at the ingenious fusion of strings reminiscent of the series' soundtrack, expertly woven into this musical tapestry. Clocking in at just under two minutes, \"Bikini Bottom\" exudes a refreshing brevity that leaves audiences yearning for more, a testament to Ice Spice's exceptional ability to captivate and entertain. Embodying a harmonious convergence of creativity and charisma, \"Bikini Bottom\" solidifies Ice Spice's position as an artist who defies expectations and delivers an auditory experience that is nothing short of extraordinary.",
      youtubeEmbed: "rZfaAAO247A"
    },
    {
      title: "Munch",
      year: 2022,
      description: "\"Munch (Feelin' U)\" stands as an electrifying drill anthem that showcases Ice Spice's unapologetic prowess as a wordsmith and her unparalleled ability to captivate the masses with her scintillating verses. In this fiery track, she fearlessly confronts a disloyal man, aptly labeling him a \"munch\" – a term that she ingeniously redefines as a \"particularly clueless kind of guy—a dummy, a sucker, a simp. Upon its announcement, the song created waves of excitement across social media, bolstered by none other than the esteemed Canadian rapper Drake, who readily offered him cosign to Ice Spice's musical endeavor. With Drake's seal of approval, \"Munch (Feelin' U)\" received an unprecedented surge of anticipation, and upon its release, it promptly became a viral sensation on TikTok, sweeping through the platform with a fervor that solidified Ice Spice's position as a rising star in the rap universe. In this magnetic track, Ice Spice transcends the boundaries of conventional drill music, delivering a hard-hitting message with her signature relaxed flow, a feat that distinguishes her as a trailblazer in the ever-evolving landscape of contemporary rap.",
      youtubeEmbed: "YleOpBLlbOw"
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
          <h1 className="text-4xl font-bold mb-4">Ice Spice</h1>
          <p className="text-xl mb-8">
            Ice Spice, born Isis Naija Gaston on January 1, 2000, hails from the Bronx, New York. Growing up in this iconic borough, known for its rich hip-hop history, undoubtedly influenced her future career path. While details about her childhood are limited, it's known that she was raised in a musical environment, with her father being an underground rapper. Ice Spice's journey in the music industry began in earnest around 2021. She started by releasing freestyles and original tracks on SoundCloud, gradually building a following. Her unique style, blending catchy hooks with a laid-back delivery, began to catch the attention of listeners and industry insiders alike.
          </p>
          <p className="text-xl mb-8">
            The turning point in Ice Spice's career came in 2022 with the release of her single "Munch (Feelin' U)." The track quickly went viral on TikTok and other social media platforms, propelling her into the spotlight. The song's success was bolstered by a co-sign from Drake, which significantly increased her visibility in the rap scene. Ice Spice's music is often categorized within the drill rap subgenre, which originated in Chicago and gained popularity in New York. Her style is characterized by catchy hooks, witty wordplay, and a confident, almost nonchalant delivery. She has cited artists like Lil' Kim and Nicki Minaj as influences on her work.
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

export default IceSpice;