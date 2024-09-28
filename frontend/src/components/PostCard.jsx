import React, { useState } from 'react';
import { Button, Badge, Collapse, Row, Col } from 'react-bootstrap';
import userComment from '../images/user-comment.png';
import '../style/PostCard.scss';

const PostCard = ({ post }) => {
  const [showReplies, setShowReplies] = useState(false);

  const getTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffTime = Math.abs(now - commentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? 'a day ago' : `${diffDays} days ago`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const tagColors = [
    'primary', 'secondary', 'success', 'danger', 'warning',
    'info', 'dark', 'primary', 'info', 'danger'
  ];

  const renderTags = (tags) => {
    return tags.map((tag, index) => (
      <Badge key={index} bg={tagColors[index % tagColors.length]} className="me-1 mb-1">
        {tag}
      </Badge>
    ));
  };

  const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const comments = Array.isArray(post.comments) ? post.comments : []; // Lấy danh sách bình luận
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className="post-card">
      <h4 className="text-center"><strong>{post.title}</strong></h4>
      
      <Row className="align-items-start">
        <Col md={8}>
          <p className="post-author"><strong>Author:</strong> <strong>{post.author}</strong></p>
          <p className="post-date"><strong>Created at:</strong> <strong>{formatDate(post.created_at)}</strong></p>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-column align-items-end">
            {chunkArray(tags, 4).map((chunk, idx) => (
              <div key={idx} className="d-flex flex-wrap justify-content-end mb-1">
                {renderTags(chunk)}
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <p className="post-content">{post.content}</p>
      </Row>
      <Button
        variant="link"
        onClick={(e) => {
          e.stopPropagation();
          setShowReplies(!showReplies);
        }}
        aria-controls="reply-collapse"
        aria-expanded={showReplies}
        className="p-0 replies-link"
      >
        {comments.length} Replies
      </Button>

      <Collapse in={showReplies}>
        <div id="reply-collapse" className="comment-section">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <div className="d-flex align-items-center">
                <img src={userComment} alt="User Comment" className="user-comment-icon" />
                <span className="comment-author">{comment.author || 'Anonymous'}</span>
                <span className="comment-time">{getTimeAgo(comment.created_at)}</span>
              </div>
              <p className="comment-content">{comment.content}</p>
              <Button variant="link" className="p-0 reply-to-link">Reply to</Button>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default PostCard;
