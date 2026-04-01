import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

type GiphyPickerProps = {
  apiKey?: string;
  handleSelected: (gif: any) => void;
  placeholder?: string;
};

const PickerRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1 1 240px;
  min-height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 0 16px;
  background: rgba(8, 12, 26, 0.68);
  color: #f8fafc;
  font-size: 15px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);

  &::placeholder {
    color: rgba(226, 232, 240, 0.45);
  }

  &:focus {
    border-color: rgba(134, 239, 172, 0.42);
    box-shadow:
      0 0 0 4px rgba(34, 197, 94, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
`;

const buttonBase = `
  min-height: 46px;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    opacity 160ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  ${buttonBase}
  color: #06111f;
  background: linear-gradient(135deg, #7dd3fc, #86efac);
  box-shadow:
    0 12px 24px rgba(2, 6, 23, 0.24),
    0 1px 0 rgba(255, 255, 255, 0.4) inset;
`;

const SecondaryButton = styled.button`
  ${buttonBase}
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
`;

const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  color: rgba(226, 232, 240, 0.72);
  font-size: 12px;
`;

const StatusPillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StatusPill = styled.div<{ tone?: "default" | "danger" | "accent" }>`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid
    ${(props) =>
      props.tone === "danger"
        ? "rgba(252, 165, 165, 0.22)"
        : props.tone === "accent"
          ? "rgba(134, 239, 172, 0.24)"
          : "rgba(255, 255, 255, 0.1)"};
  background:
    ${(props) =>
      props.tone === "danger"
        ? "rgba(127, 29, 29, 0.26)"
        : props.tone === "accent"
          ? "rgba(20, 83, 45, 0.24)"
          : "rgba(255, 255, 255, 0.05)"};
  color:
    ${(props) =>
      props.tone === "danger"
        ? "#fee2e2"
        : props.tone === "accent"
          ? "#dcfce7"
          : "#e2e8f0"};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ResultsScroller = styled.div`
  max-height: 360px;
  overflow: auto;
  padding-right: 6px;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
  gap: 12px;
`;

const GifCard = styled.button`
  display: flex;
  flex-direction: column;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(12, 18, 37, 0.82);
  cursor: pointer;
  text-align: left;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(125, 211, 252, 0.36);
    box-shadow: 0 18px 30px rgba(2, 6, 23, 0.22);
  }
`;

const GifThumb = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1.04;
  object-fit: cover;
  background: rgba(15, 23, 42, 0.92);
`;

const GifMeta = styled.div`
  padding: 10px 12px 12px;
`;

const GifTitle = styled.div`
  color: #f8fafc;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
`;

const GifSource = styled.div`
  margin-top: 4px;
  color: rgba(226, 232, 240, 0.56);
  font-size: 11px;
  line-height: 1.4;
`;

const EmptyState = styled.div`
  display: grid;
  place-items: center;
  min-height: 220px;
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(226, 232, 240, 0.7);
  text-align: center;
  padding: 24px;
  line-height: 1.6;
`;

const SkeletonCard = styled.div`
  min-height: 208px;
  border-radius: 18px;
  background:
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.04) 100%
    );
  background-size: 200% 100%;
  animation: shimmer 1.25s linear infinite;

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }

    to {
      background-position: -200% 0;
    }
  }
`;

function truncateTitle(title: string) {
  const normalized = title.replace(/\s+/g, " ").trim();
  if (!normalized) return "Select this GIF";
  if (normalized.length <= 48) return normalized;
  return `${normalized.slice(0, 45).trim()}...`;
}

function previewImage(gif: any) {
  return (
    gif?.images?.fixed_width_downsampled?.url ||
    gif?.images?.fixed_width?.url ||
    gif?.images?.preview_gif?.url ||
    gif?.images?.original?.url ||
    ""
  );
}

export default function GiphyPicker({
  apiKey,
  handleSelected,
  placeholder = "Search GIFs",
}: GiphyPickerProps) {
  const [gifs, setGifs] = useState<any[]>([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"search" | "trending">("trending");

  async function search(query = "", nextMode: "search" | "trending" = "search") {
    const normalizedQuery = query.trim();
    const shouldSearch = nextMode === "search" && Boolean(normalizedQuery);
    const endpoint = shouldSearch
      ? "https://api.giphy.com/v1/gifs/search"
      : "https://api.giphy.com/v1/gifs/trending";

    if (!apiKey) {
      setError("Add a Giphy API key before using the GIF picker.");
      setGifs([]);
      return;
    }

    setLoading(true);
    setError("");
    setMode(shouldSearch ? "search" : "trending");

    try {
      const response = await axios.get(endpoint, {
        params: {
          api_key: apiKey,
          limit: 18,
          q: shouldSearch ? normalizedQuery : undefined,
        },
      });

      setGifs(response.data?.data || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Giphy could not load results right now. Try again in a moment."
      );
      setGifs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void search("", "trending");
  }, []);

  function handleSubmit() {
    void search(term, term.trim() ? "search" : "trending");
  }

  function handleTrending() {
    setTerm("");
    void search("", "trending");
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    handleSubmit();
  }

  const headline = loading
    ? "Loading GIFs"
    : mode === "search"
      ? `Results for "${term.trim() || "GIF"}"`
      : "Trending on Giphy";

  return (
    <PickerRoot>
      <SearchRow>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <PrimaryButton type="button" onClick={handleSubmit} disabled={loading}>
          Search
        </PrimaryButton>
        <SecondaryButton type="button" onClick={handleTrending} disabled={loading}>
          Trending
        </SecondaryButton>
      </SearchRow>

      <StatusRow>
        <div>{headline}</div>
        <StatusPillRow>
          <StatusPill tone={loading ? "accent" : "default"}>
            {loading ? "Fetching" : `${gifs.length} GIFs`}
          </StatusPill>
          <StatusPill tone={error ? "danger" : "default"}>
            {error ? "Needs Attention" : mode === "search" ? "Search Mode" : "Trending"}
          </StatusPill>
        </StatusPillRow>
      </StatusRow>

      <ResultsScroller>
        {error ? (
          <EmptyState>{error}</EmptyState>
        ) : loading && gifs.length === 0 ? (
          <ResultsGrid>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={`giphy-skeleton-${index}`} />
            ))}
          </ResultsGrid>
        ) : gifs.length === 0 ? (
          <EmptyState>
            No GIFs matched this search yet.
            <br />
            Try a shorter term or switch back to trending.
          </EmptyState>
        ) : (
          <ResultsGrid>
            {gifs.map((gif) => {
              const preview = previewImage(gif);
              const title = truncateTitle(gif?.title || gif?.slug || "");
              const source = gif?.username || gif?.source_tld || "Giphy";

              return (
                <GifCard
                  key={`giphy-${gif.id}`}
                  type="button"
                  onClick={() => handleSelected(gif)}
                >
                  <GifThumb alt={title} src={preview} loading="lazy" />
                  <GifMeta>
                    <GifTitle>{title}</GifTitle>
                    <GifSource>{source}</GifSource>
                  </GifMeta>
                </GifCard>
              );
            })}
          </ResultsGrid>
        )}
      </ResultsScroller>
    </PickerRoot>
  );
}
