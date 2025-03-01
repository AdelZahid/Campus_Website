import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer"; // Added Footer import
import "./BookDetailPage.css";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate fetching the book data
    const fetchBook = () => {
      setLoading(true);
      // Sample book data
      const sampleBooks = [
        {
          id: 1,
          title: "Introduction to Artificial Intelligence",
          type: "Book",
          category: "Technology",
          image: "/images/ai-book.jpg",
          author: "John Smith",
          publishedYear: 2021,
          publisher: "Tech Publishing House",
          isbn: "978-1234567890",
          pages: 420,
          language: "English",
          description:
            "This comprehensive guide introduces the fundamentals of artificial intelligence, including machine learning, neural networks, and natural language processing. Perfect for beginners and intermediate learners alike.",
          available: true,
          reviews: [
            {
              id: 1,
              user: "Michael R.",
              rating: 5,
              comment: "Excellent introduction to AI concepts!",
            },
            {
              id: 2,
              user: "Sarah T.",
              rating: 4,
              comment:
                "Very thorough, but some sections are a bit too technical.",
            },
          ],
          relatedBooks: [2, 6],
        },
        {
          id: 2,
          title: "Molecular Biology",
          type: "Journal",
          category: "Science",
          image: "/images/biology.jpg",
          author: "Maria Johnson",
          publishedYear: 2020,
          publisher: "Science Academic Press",
          isbn: "978-0987654321",
          pages: 180,
          language: "English",
          description:
            "A journal focusing on the latest discoveries in molecular biology, featuring research papers from leading scientists in the field.",
          available: true,
          reviews: [
            {
              id: 1,
              user: "David K.",
              rating: 5,
              comment:
                "Cutting-edge research compiled in an accessible format.",
            },
          ],
          relatedBooks: [3, 6],
        },
        {
          id: 3,
          title: "Modern Economic Theory",
          type: "Research Paper",
          category: "Commerce",
          image: "/images/economics.jpg",
          author: "Robert Williams",
          publishedYear: 2022,
          publisher: "Economic Research Institute",
          isbn: "978-5678901234",
          pages: 120,
          language: "English",
          description:
            "An analysis of contemporary economic theories and their applications in global markets, with case studies and empirical evidence.",
          available: false,
          reviews: [
            {
              id: 1,
              user: "Jennifer P.",
              rating: 4,
              comment: "Insightful analysis of current economic trends.",
            },
            {
              id: 2,
              user: "Thomas B.",
              rating: 5,
              comment: "Well-researched with compelling arguments.",
            },
          ],
          relatedBooks: [5],
        },
        {
          id: 4,
          title: "Renaissance Art History",
          type: "Book",
          category: "Arts",
          image: "/images/art.jpg",
          author: "Emma Thompson",
          publishedYear: 2019,
          publisher: "Arts & Culture Press",
          isbn: "978-6789012345",
          pages: 350,
          language: "English",
          description:
            "A beautifully illustrated journey through Renaissance art, exploring the works of masters like Leonardo da Vinci, Michelangelo, and Raphael.",
          available: true,
          reviews: [
            {
              id: 1,
              user: "Laura M.",
              rating: 5,
              comment: "Stunning visuals and detailed historical context.",
            },
          ],
          relatedBooks: [5],
        },
        {
          id: 5,
          title: "World War II: A Comprehensive Analysis",
          type: "Article",
          category: "History",
          image: "/images/history.jpg",
          author: "David Brown",
          publishedYear: 2022,
          publisher: "Historical Review",
          isbn: "978-7890123456",
          pages: 85,
          language: "English",
          description:
            "An in-depth analysis of the causes, events, and aftermath of World War II, drawing on recently declassified documents and firsthand accounts.",
          available: true,
          reviews: [
            {
              id: 1,
              user: "Richard D.",
              rating: 4,
              comment: "Well-researched with some fascinating new insights.",
            },
            {
              id: 2,
              user: "Patricia H.",
              rating: 5,
              comment:
                "One of the most comprehensive analyses I've read on this topic.",
            },
          ],
          relatedBooks: [4],
        },
        {
          id: 6,
          title: "Quantum Physics Applications",
          type: "Research Paper",
          category: "Research",
          image: "/images/physics.jpg",
          author: "Alan Davidson",
          publishedYear: 2023,
          publisher: "Scientific Research Journal",
          isbn: "978-8901234567",
          pages: 110,
          language: "English",
          description:
            "Exploring practical applications of quantum physics in computing, cryptography, and medicine, with predictions for future technological developments.",
          available: false,
          reviews: [
            {
              id: 1,
              user: "Kevin L.",
              rating: 5,
              comment: "Cutting-edge research explained in accessible terms.",
            },
          ],
          relatedBooks: [1, 2],
        },
      ];

      const foundBook = sampleBooks.find((b) => b.id === parseInt(bookId));

      // Simulate API delay
      setTimeout(() => {
        setBook(foundBook || null);
        setLoading(false);
      }, 500);
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="book-detail-page">
        <Navbar />
        <div className="book-detail-content">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-detail-page">
        <Navbar />
        <div className="book-detail-content">
          <div className="error-message">
            <h2>Resource Not Found</h2>
            <p>
              The resource you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/library" className="back-button">
              Back to Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      <Navbar />
      <div className="book-detail-content">
        <div className="breadcrumb">
          <Link to="/library">Library</Link> {">"} {book.title}
        </div>

        <div className="book-detail-main">
          <div className="book-image-container">
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-actions">
              {book.available ? (
                <Link
                  to={`/library/borrow/${book.id}`}
                  className="borrow-button"
                >
                  Borrow Now
                </Link>
              ) : (
                <span className="unavailable-label">Currently Unavailable</span>
              )}
              <button className="wishlist-button">
                <i className="far fa-bookmark"></i> Add to Wishlist
              </button>
            </div>
          </div>

          <div className="book-info">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">By {book.author}</p>

            <div className="book-meta">
              <div className="meta-item">
                <span className="meta-label">Type:</span>
                <span className="meta-value">{book.type}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{book.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Published:</span>
                <span className="meta-value">{book.publishedYear}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Publisher:</span>
                <span className="meta-value">{book.publisher}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">ISBN:</span>
                <span className="meta-value">{book.isbn}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Pages:</span>
                <span className="meta-value">{book.pages}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Language:</span>
                <span className="meta-value">{book.language}</span>
              </div>
            </div>

            <div className="book-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          </div>
        </div>

        <div className="book-reviews">
          <h3>Reviews</h3>
          {book.reviews.length > 0 ? (
            <div className="reviews-list">
              {book.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-user">{review.user}</div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${
                            i < review.rating ? "filled" : ""
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet.</p>
          )}
        </div>
      </div>
      <Footer /> {/* Added Footer component */}
    </div>
  );
};

export default BookDetailPage;
