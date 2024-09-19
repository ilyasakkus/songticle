import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const Radiohead = () => {
  const songs = [
    {
      title: "Creep",
      year: 1992,
      description: "Radiohead's debut single, \"Creep,\" a transformative track that left an indelible mark on the alternative rock landscape. Initially not intended for release, fate intervened as producers Sean Slade and Paul Q. Kolderie urged its inclusion. While \"Creep\" didn't achieve immediate success, it soared to prominence on American alternative rock radio and achieved global fame upon its reissue in 1993. It's raw emotion and gripping lyrics struck a chord with audiences, leading it to be likened to alt-rock classics like Nirvana's \"Smells Like Teen Spirit\" and Beck's \"Loser.\" Despite the pressure to replicate its success, \"Creep\" became both a blessing and a burden for Radiohead, leading them to evolve their sound and break free from its shadow. Despite their subsequent commercial and critical achievements, \"Creep\" remains their most iconic single, hailed as one of the greatest debut singles of all time by Rolling Stone. In 2021, Thom Yorke revisited this iconic anthem, releasing a remixed version that showcases his perpetual artistic growth and innovation. As \"Creep\" continues to resonate with new generations, its timeless allure solidifies its status as a musical masterpiece and a definitive pillar in Radiohead's illustrious journey.",
      youtubeEmbed: "XFkzRNyygfk"
    },
    {
      title: "No Surprises",
      year: 1998,
      description: "Enter the captivating world of Radiohead's evocative ballad, \"No Surprises,\" released as the fourth and final single from their iconic album \"OK Computer\" in 1998. The song's mesmerizing glockenspiel and \"childlike\" essence, inspired by the Beach Boys' legendary \"Pet Sounds,\" exude a haunting allure that resonates with the depths of the soul. Thom Yorke's emotive vocals convey a sense of introspection and resignation, as the music video, directed by Grant Gee, paints a striking visual narrative of submerged emotions and a yearning for escape. Transporting listeners to a realm of ethereal melancholy, \"No Surprises\" secured its place at number four on the UK Singles Chart, etching its brilliance into the hearts of music enthusiasts worldwide. This timeless gem remains a testament to Radiohead's mastery in crafting music that encapsulates both fragility and power, leaving an indelible mark on the musical landscape.",
      youtubeEmbed: "u5CVsCnxyXg"
    },
    {
      title: "Karma Police",
      year: 1997,
      description: "\"Karma Police\" is an ethereal and haunting masterpiece by Radiohead, released as the second single from their influential album \"OK Computer\" in 1997. The song's captivating blend of acoustic guitar and piano, coupled with Thom Yorke's haunting vocals, weaves a tale of introspection and cosmic justice. It achieved commercial success, reaching number one in Iceland and number eight on the UK Singles Chart. The music video, directed by Jonathan Glazer, adds an enigmatic visual dimension to the song's themes. Praised as a timeless classic, \"Karma Police\" continues to be celebrated, securing a spot on Rolling Stone's list of the 500 greatest songs of all time.",
      youtubeEmbed: "1uYWYWPc9HU"
    },
    {
      title: "High and Dry",
      year: 1995,
      description: "Embark on a journey through the annals of musical history with Radiohead's iconic double-A side single, \"High and Dry\" and \"Planet Telex,\" released from their lauded second album, \"The Bends\" (1995), on 27th February 1995. \"High and Dry\" emerged from the depths of a demo recorded during the sessions of their debut album, \"Pablo Honey\" (1993), and was revitalized for inclusion in \"The Bends,\" leaving an indelible mark on the musical landscape. Its emotive essence has influenced acclaimed bands such as Travis and Coldplay, attesting to its timeless appeal and far-reaching impact.",
      youtubeEmbed: "7qFfFVSerQo"
    },
    {
      title: "Lotus Flower",
      year: 2011,
      description: "Prepare to be entranced by the mesmerizing allure of Radiohead's \"Lotus Flower,\" a captivating gem from their eighth studio album, \"The King of Limbs\" (2011). This enigmatic track features Thom Yorke's haunting falsetto, gracefully weaving over syncopated beats and a pulsating synthesizer bassline, creating an ethereal sonic landscape that defies conventions. The song's music video, a visual spectacle featuring Yorke's entrancing and erratic dance moves, swiftly became a cultural phenomenon, inspiring a widespread internet meme. While \"Lotus Flower\" wasn't released as a commercial single, its magnetic appeal propelled it onto various charts, leaving a trail of accolades in its wake. Nominated for multiple Grammy Awards, this enigmatic masterpiece garnered universal acclaim for its innovative sound and artistic vision. Thom Yorke's emotive solo performances of \"Lotus Flower\" during live shows provided a glimpse into the song's ethereal essence, resonating deeply with audiences worldwide. Its enchanting aura, possibly recorded in the artistic haven of actress Drew Barrymore's house, solidifies \"Lotus Flower\" as a timeless testament to Radiohead's ability to craft music that transcends boundaries, elevating the senses and stirring the soul.",
      youtubeEmbed: "cfOa1a8hYP8"
    },
    {
      title: "Daydreaming",
      year: 2016,
      description: "Prepare to be transported into a dreamscape of emotional resonance with Radiohead's ethereal ballad, \"Daydreaming.\" Produced by the esteemed Nigel Godrich and adorned with strings arranged by the band's visionary guitarist, Jonny Greenwood, this piano-driven masterpiece casts an enchanting spell that lingers in the soul. Released as the second and final single from their ninth studio album, \"A Moon Shaped Pool,\" \"Daydreaming\" effortlessly weaves ambient, electronic, and orchestral elements into a sonic tapestry that defies genre conventions. The music video, directed by the renowned filmmaker Paul Thomas Anderson, serves as a mesmerizing visual companion to the song's introspective journey. Thom Yorke, Radiohead's enigmatic frontman, traverses a surreal realm of disconnected locations, as if seeking solace and understanding amidst the haunting melodies. With its poignant lyrics and emotive piano motif, \"Daydreaming\" becomes an evocative reckoning of years gone by, an elegy to moments lost in time.",
      youtubeEmbed: "TTAU7lLDZYU"
    },
    {
      title: "Fake Plastic Trees",
      year: 1995,
      description: "In a haunting display of emotional vulnerability, Radiohead's \"Fake Plastic Trees\" stands as an enduring masterpiece, emanating from the depths of songwriter Thom Yorke's introspective musings. Released on their seminal album \"The Bends\" in 1995, this poignant single captivated hearts worldwide with its heartfelt melodies and raw lyricism. Yorke's candid revelation about the genesis of the song, born from a \"lonely, drunken evening\" and an unconventional writing process, adds a layer of authenticity to its haunting allure. As the band navigated the pressures of record label expectations, \"Fake Plastic Trees\" emerged as a testament to artistic resilience, finding its ethereal form during a solo acoustic recording session, graced by Yorke's falsetto brilliance. Overcoming the turmoil of its inception, this evocative ballad has since become a timeless anthem, resonating with listeners on a profound level and solidifying Radiohead's status as pioneers of musical authenticity.",
      youtubeEmbed: "n5h0qHwNrHk"
    },
    {
      title: "House of Cards",
      year: 2007,
      description: "Prepare to be entranced as we delve into the captivating world of Radiohead's \"House of Cards,\" a mesmerizing gem from their iconic seventh studio album, In Rainbows (2007). This enchanting song, initially released alongside \"Bodysnatchers\" in the United Kingdom, effortlessly weaves a spellbinding tapestry of love and vulnerability, leaving us utterly spellbound. It is a testament to the band's artistic prowess, as \"House of Cards\" showcases their innovative approach to music, seamlessly merging cutting-edge technology with their signature sound. The music video, directed by the visionary James Frost, elevates the experience further, utilizing lidar technology to create rendered images that beautifully intersperse with glimpses of suburban landscapes and revelers at a captivating party. Originally performed acoustically by Thom Yorke at the 2005 Trade Justice rally in London, \"House of Cards\" underwent a metamorphosis, resulting in an ethereal piece of musical brilliance.",
      youtubeEmbed: "8nTFjVm9sTQ"
    },
    {
      title: "Street Spirit",
      year: 1995,
      description: "Enter the captivating world of Radiohead's haunting masterpiece, \"Street Spirit (Fade Out).\" Featured in their second studio album, \"The Bends,\" this poignant single showcases the band's ingenuity in pushing the boundaries of alternative rock. This song was released in 1995. Thom Yorke's emotive vocals and Ed O'Brien's mesmerizing guitar arpeggios weave an ethereal web of emotion, while the song's atmospheric melodies tap into a sense of capitalist dread. Accompanied by an evocative music video by Jonathan Glazer, the track's universal appeal has led to interpretations by diverse artists. \"Street Spirit (Fade Out)\" stands as a timeless opus, captivating hearts and minds with its profound allure and ensuring its place in the annals of musical history.",
      youtubeEmbed: "LCJblaUkkfc"
    },
    {
      title: "Burn The Witch",
      year: 2016,
      description: "\"Burn the Witch\" is a captivating and politically charged song by the English rock band Radiohead. Released in 2016 as the lead single from their ninth studio album, \"A Moon Shaped Pool,\" the track immediately caught the attention of fans and critics alike. The song opens with a tense and eerie orchestral arrangement, featuring strings that create a foreboding atmosphere. Thom Yorke's distinct and haunting vocals deliver cryptic lyrics that allude to themes of mob mentality, mass hysteria, and the dangers of blind conformity. The title \"Burn the Witch\" serves as a metaphor for the tendency of society to scapegoat and persecute individuals or groups who may be perceived as different or threatening.",
      youtubeEmbed: "yI2oS2hoL0k"
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
          <h1 className="text-4xl font-bold mb-4">Radiohead</h1>
          <p className="text-xl mb-8">
            Embark on a journey through the captivating world of Radiohead, the English rock pioneers whose experimental approach revolutionized alternative rock. From their global breakthrough with "Creep" to the multi-part epic "Paranoid Android" from the iconic OK Computer album, Radiohead's musical brilliance is unrivaled. Their ability to seamlessly blend haunting vocals, ethereal melodies, and profound lyricism is evident in timeless classics like "Fake Plastic Trees" and the hauntingly atmospheric "Karma Police."
          </p>
          <p className="text-xl mb-8">
            The band's sonic inventiveness is further showcased in tracks like "Everything in Its Right Place," an electronic dreamscape, and "Idioteque," an audacious fusion of electronic experimentation and haunting lyrics. As we delve deeper into their mesmerizing repertoire, we encounter songs like "Street Spirit (Fade Out)" and "Pyramid Song," both exuding an otherworldly allure. This compilation of the 10 Best Radiohead Songs of All Time stands as a testament to the band's lasting impact on popular music, solidifying their position as musical innovators whose artistry continues to inspire and enthrall listeners around the globe.
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

export default Radiohead;