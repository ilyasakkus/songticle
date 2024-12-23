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
            Start a Discussion
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
        <aside className="w-[240px] bg-base-100 min-h-[calc(100vh-64px)] border-r">
          <div className="p-4">
            <div className="flex flex-col space-y-2">
              <a className="flex items-center gap-2 text-primary hover:bg-base-200 p-2 rounded-lg">
                <span className="material-icons">forum</span>
                All Discussions
              </a>
              <a className="flex items-center gap-2 hover:bg-base-200 p-2 rounded-lg">
                <span className="material-icons">star</span>
                Following
              </a>
              <div className="divider my-2"></div>
            </div>
          </div>
          <div className="px-4">
            <h2 className="text-sm font-semibold mb-2">ARTISTS</h2>
            <div className="space-y-1">
              {artists.map((artist) => (
                <div key={artist.id} className="text-sm">
                  <div className="flex items-center gap-2 hover:bg-base-200 p-2 rounded-lg cursor-pointer">
                    <span className="material-icons text-base">person</span>
                    {artist.name}
                  </div>
                  <div className="ml-6 space-y-1">
                    {artist.albums.map((album) => (
                      <div key={album.id}>
                        <div className="flex items-center gap-2 hover:bg-base-200 p-2 rounded-lg cursor-pointer text-sm">
                          <span className="material-icons text-base">album</span>
                          {album.title}
                        </div>
                        <div className="ml-6">
                          {album.songs.map((song) => (
                            <div key={song.id} className="flex items-center gap-2 hover:bg-base-200 p-2 rounded-lg cursor-pointer text-sm">
                              <span className="material-icons text-base">music_note</span>
                              {song.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="join">
                <button className="btn join-item btn-active">Latest</button>
                <button className="btn join-item">Top</button>
                <button className="btn join-item">Solved</button>
              </div>
            </div>

            <div className="space-y-4">
              {stories.map((story) => (
                <div key={story.id} className="bg-base-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={story.userImage} alt={story.userName} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-lg hover:text-primary cursor-pointer">
                          {story.songTitle}
                        </h3>
                        <div className="flex items-center gap-2 text-base-content/70">
                          <span className="flex items-center gap-1">
                            <span className="material-icons text-sm">chat_bubble_outline</span>
                            {story.comments}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-base-content/70 mt-1">
                        <span>{story.userName}</span>
                        <span className="mx-2">•</span>
                        <span>replied {story.date}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span className="badge badge-primary">{story.artist}</span>
                        <span className="badge">{story.album}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
