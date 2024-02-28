import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Draggable from 'react-draggable';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleDateChange = date => {
    setSelectedDate(date);
    setComment('');
  };

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  const getRandomColor = () => {
    const colors = ['#ffb6c1', '#add8e6', '#90ee90', '#ffff66'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSaveComment = () => {
    if (selectedDate && comment) {
      const newComment = {
        id: Math.random().toString(36).substring(7),
        date: selectedDate,
        text: comment,
        position: {
          top: Math.random() * (window.innerHeight - 200) + 50 + 'px',
          left: Math.random() * (window.innerWidth - 200) + 50 + 'px'
        },
        color: getRandomColor(),
        width: 200,
        height: 150
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleDrag = (event, ui, id) => {
    const { deltaX, deltaY } = ui;
    setComments(prevComments =>
      prevComments.map(prevComment =>
        prevComment.id === id
          ? { ...prevComment, position: { top: prevComment.position.top + deltaY, left: prevComment.position.left + deltaX } }
          : prevComment
      )
    );
  };

  return (
    <div className="calendar-container">
      <h2>Note-it</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecione uma data"
        className="datepicker"
      />
      {selectedDate && (
        <div className="comment-section">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Digite seu comentário"
            rows={4}
            cols={30}
            className="comment-input"
          />
          <button onClick={handleSaveComment} className="comment-button">Salvar Comentário</button>
        </div>
      )}
      {comments.map(comment => (
        <Draggable key={comment.id} onDrag={(event, ui) => handleDrag(event, ui, comment.id)}>
          <div
            className="postit"
            style={{
              top: comment.position.top,
              left: comment.position.left,
              backgroundColor: comment.color,
              width: comment.width + 'px',
              height: comment.height + 'px'
            }}
          >
            <div className="postit-date">{comment.date.toLocaleDateString()}</div>
            <div className="postit-text" style={{ overflow: 'hidden', wordWrap: 'break-word' }}>{comment.text}</div>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default Calendar;
