type Recommendation = {
  title: string;
  artist: string;
  search_query?: string;
};

type Props = {
  reasoning?: string;
  recommendations: Recommendation[];
};

const GenAIResults = ({ reasoning, recommendations }: Props) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No AI recommendations available.
      </p>
    );
  }

  const openSpotify = (query?: string) => {
    if (!query) return;
    const url = `https://open.spotify.com/search/${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="glass-strong rounded-3xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Song Recommendations
      </h3>

      <ul className="space-y-3">
        {recommendations.map((song, index) => (
          <li
            key={index}
            className="p-3 rounded-xl bg-muted/10 border border-border/30 flex items-center justify-between"
          >
            {/* Song Info */}
            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-muted-foreground">
                {song.artist}
              </p>
            </div>

            {/* Spotify Button */}
            {song.search_query && (
              <button
                onClick={() => openSpotify(song.search_query)}
                className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
              >
                Play on Spotify
              </button>
            )}
          </li>
        ))}
      </ul>

      {reasoning && (
        <p className="text-xs text-muted-foreground mt-4">
          {reasoning}
        </p>
      )}
    </div>
  );
};

export default GenAIResults;
