import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer"; // Added Footer import
import "./BorrowPage.css";

const BorrowPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowDuration, setBorrowDuration] = useState(7);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
          available: true,
        },
        {
          id: 2,
          title: "Molecular Biology",
          type: "Journal",
          category: "Science",
          image: "/images/biology.jpg",
          author: "Maria Johnson",
          publishedYear: 2020,
          available: true,
        },
        {
          id: 3,
          title: "Modern Economic Theory",
          type: "Research Paper",
          category: "Commerce",
          image: "/images/economics.jpg",
          author: "Robert Williams",
          publishedYear: 2022,
          available: false,
        },
        {
          id: 4,
          title: "Renaissance Art History",
          type: "Book",
          category: "Arts",
          image: "/images/art.jpg",
          author: "Emma Thompson",
          publishedYear: 2019,
          available: true,
        },
        {
          id: 5,
          title: "World War II: A Comprehensive Analysis",
          type: "Article",
          category: "History",
          image: "/images/history.jpg",
          author: "David Brown",
          publishedYear: 2022,
          available: true,
        },
        {
          id: 6,
          title: "Quantum Physics Applications",
          type: "Research Paper",
          category: "Research",
          image: "/images/physics.jpg",
          author: "Alan Davidson",
          publishedYear: 2023,
          available: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to save the borrow request
    // For now, we'll just simulate a successful borrow

    setFormSubmitted(true);

    // Redirect to a success page after 2 seconds
    setTimeout(() => {
      navigate("/library");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="borrow-page">
        <Navbar />
        <div className="borrow-content">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="borrow-page">
        <Navbar />
        <div className="borrow-content">
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

  if (!book.available) {
    return (
      <div className="borrow-page">
        <Navbar />
        <div className="borrow-content">
          <div className="error-message">
            <h2>Resource Unavailable</h2>
            <p>This resource is currently unavailable for borrowing.</p>
            <Link to={`/library/${book.id}`} className="back-button">
              Back to Resource Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="borrow-page">
      <Navbar />
      <div className="borrow-content">
        <div className="breadcrumb">
          <Link to="/library">Library</Link> {">"}
          <Link to={`/library/${book.id}`}>{book.title}</Link> {">"}
          Borrow
        </div>

        {formSubmitted ? (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <h2>Borrow Request Submitted</h2>
            <p>
              Your request to borrow "{book.title}" has been submitted
              successfully.
            </p>
            <p>You will be redirected to the library page shortly...</p>
          </div>
        ) : (
          <div className="borrow-container">
            <h1>Borrow Resource</h1>

            <div className="borrow-details">
              <div className="book-preview">
                <img
                  src={book.image}
                  alt={book.title}
                  className="book-thumbnail"
                />
                <div className="book-info-preview">
                  <h3>{book.title}</h3>
                  <p className="book-author">By {book.author}</p>
                  <div className="book-meta-preview">
                    <span className="meta-item">{book.type}</span>
                    <span className="meta-item">{book.category}</span>
                    <span className="meta-item">{book.publishedYear}</span>
                  </div>
                </div>
              </div>

              <form className="borrow-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="borrowDuration">Borrow Duration (days)</label>
                  <select
                    id="borrowDuration"
                    value={borrowDuration}
                    onChange={(e) => setBorrowDuration(e.target.value)}
                    className="form-control"
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="21">21 days</option>
                    <option value="30">30 days</option>
                  </select>
                </div>

                <div className="borrow-summary">
                  <h4>Borrow Summary</h4>
                  <div className="summary-row">
                    <span>Borrow Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Return By:</span>
                    <span>
                      {new Date(
                        Date.now() + borrowDuration * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Late Fee:</span>
                    <span>$0.50 per day</span>
                  </div>
                </div>

                <div className="form-group terms-checkbox">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    I agree to return the resource by the due date and
                    understand that late returns will incur fees.
                  </label>
                </div>

                <div className="form-actions">
                  <Link to={`/library/${book.id}`} className="cancel-button">
                    Cancel
                  </Link>
                  <button type="submit" className="submit-button">
                    Confirm Borrow
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer /> {/* Added Footer component */}
    </div>
  );
};

export default BorrowPage;
