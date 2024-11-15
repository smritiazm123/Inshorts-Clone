import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../../src/styles/news.module.css';
import { useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export default function News() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(50); // Initial page size
    const [hasMore, setHasMore] = useState(true);
    const [openIframeIndex, setOpenIframeIndex] = useState(null); // Track open iframe by article index
    const {category}=useParams();
    const [openModal, setOpenModal] = useState(false); // Track modal open state
    const [modalArticleUrl, setModalArticleUrl] = useState(""); // Article URL for the modal
    const isSmallScreen = useMediaQuery("(max-width:1450px)"); // Media query for screens < 1400px

    // Function to fetch news
    const fetchNews = async (newPageSize = pageSize) => {
        if (newPageSize < 100) {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/everything?q=bitcoin&apiKey=ee2460ac1394454d9f0d9ee7f364df17&pageSize=${newPageSize}&page=1&sources?category=${category}`
                );

                // Check if we have more articles to load
                if (response.data.articles.length < newPageSize) {
                    setHasMore(false);
                }

                setArticles(response.data.articles);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch news data.");
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchNews();
    }, [category]);

    // Function to load more articles
    const loadMore = () => {
        const newPageSize = pageSize + 20;
        setPageSize(newPageSize);
        fetchNews(newPageSize);
    };

    // Function to format timestamp
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = {
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${formattedTime} on ${formattedDate}`;
    }

    // Toggle iframe visibility for an article
    const toggleIframe = (index) => {
        if (isSmallScreen) {
            // If the screen is small, open the article in the modal
            setModalArticleUrl(articles[index].url);
            setOpenModal(true);
        } else {
            // Otherwise, toggle the iframe visibility inline
            setOpenIframeIndex(openIframeIndex === index ? null : index);
        }
    };

    if (loading) return <p>Loading news...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <div>
            <h2>Latest Bitcoin News</h2>
            {articles.length > 0 ? (
                <div style={{display:"flex"}}>
                <ul className={`${styles.container} ${openIframeIndex !== null ? styles.shiftContainer : ''}`}>
                
                    {articles.map((article, index) => (
                        article.author!==null &&
                        <>
                        <li key={index} className={styles.containerNews}>
                            <div className={styles.newsBox}>
                                <div>
                                    {article.urlToImage && (
                                        <img
                                            src={article.urlToImage}
                                            alt="article"
                                            style={{ width: "300px" }}
                                        />
                                    )}
                                </div>
                                <div>
                                    <h3>{article.title}</h3>
                                    <h4>short <span>by {article.author} / {formatTimestamp(article.publishedAt)}</span></h4>
                                    <p>{article.description}</p>
                                    <br />
                                    <a  onClick={() => toggleIframe(index)} style={{cursor:"pointer"}}>
                                        {openIframeIndex === index ? 'Close article' : 'Read more...'}
                                    </a>
                                </div>
                            </div>
                             <div>
                </div>
                        </li>
                         {openIframeIndex === index && (
                            <iframe 
                                src={article.url} 
                                className={styles.iframeStyle}
                                title="article-content"
                            />
                        )}
                        </>
                    ))}
                </ul>
                </div>
            ) : (
                <p>No articles found.</p>
            )}

            {/* Load More Button */}
            {hasMore && (
                <button
                    onClick={loadMore}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Load More
                </button>
            )}

            {!hasMore && <p>No more articles to show.</p>}
        </div>

<Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="md">
<DialogTitle>Article Content</DialogTitle>
<DialogContent>
    <iframe
        src={modalArticleUrl}
        className={styles.iframeStyle}
        title="article-content"
        width="100%"
        height="400px"
    />
</DialogContent>
<DialogActions>
    <Button onClick={() => setOpenModal(false)} color="primary">
        Close
    </Button>
</DialogActions>
</Dialog>
</>
    );
}
