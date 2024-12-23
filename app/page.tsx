import { artists, stories } from './data/sampleData';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl gap-2">
            <span className="material-icons">music_note</span>
            Songticle
          </a>
        </div>
        <div className="flex-none gap-2">
          <ThemeSwitcher />
          <button className="btn btn-primary gap-2">
            <span className="material-icons">add_circle</span>
            Add Story
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placehold.co/40x40" alt="profile" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="gap-2">
                  <span className="material-icons">person</span>
                  Profile
                </a>
              </li>
              <li>
                <a className="gap-2">
                  <span className="material-icons">settings</span>
                  Settings
                </a>
              </li>
              <li>
                <a className="gap-2">
                  <span className="material-icons">logout</span>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[300px] bg-base-100 min-h-[calc(100vh-64px)] p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-icons">library_music</span>
            Music Library
          </h2>
          <div className="space-y-4">
            {artists.map((artist) => (
              <div key={artist.id} className="collapse collapse-arrow bg-base-200">
                <input type="checkbox" /> 
                <div className="collapse-title font-medium flex items-center gap-2">
                  <span className="material-icons text-xl">person</span>
                  {artist.name}
                </div>
                <div className="collapse-content">
                  {artist.albums.map((album) => (
                    <div key={album.id} className="ml-4 mb-2">
                      <div className="collapse collapse-arrow bg-base-100">
                        <input type="checkbox" />
                        <div className="collapse-title text-sm flex items-center gap-2">
                          <span className="material-icons text-sm">album</span>
                          {album.title} ({album.year})
                        </div>
                        <div className="collapse-content">
                          <ul className="menu menu-sm">
                            {album.songs.map((song) => (
                              <li key={song.id}>
                                <a className="text-sm flex items-center gap-2">
                                  <span className="material-icons text-sm">music_note</span>
                                  {song.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {stories.map((story) => (
              <div key={story.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={story.userImage} alt={story.userName} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">{story.userName}</h3>
                      <p className="text-sm text-base-content/70">{story.date}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <span className="material-icons">music_note</span>
                      {story.songTitle}
                    </h4>
                    <p className="text-sm text-base-content/70">
                      {story.artist} • {story.album}
                    </p>
                  </div>
                  <p className="text-base-content/90">{story.userStory}</p>
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="flex gap-4">
                      <button className="btn btn-ghost btn-sm gap-2">
                        <span className="material-icons">favorite_border</span>
                        {story.likes}
                      </button>
                      <button className="btn btn-ghost btn-sm gap-2">
                        <span className="material-icons">chat_bubble_outline</span>
                        {story.comments}
                      </button>
                    </div>
                    <button className="btn btn-ghost btn-sm gap-2">
                      <span className="material-icons">share</span>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
