import React, { useState, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

export const Editor = ({ placeholder, selectedLogic, selectedPlaceholder, onLogicInserted, onPlaceholderInserted }) => {
  const [content, setContent] = useState('');
  const [quill, setQuill] = useState(null);

  const handleChange = useCallback((value) => {
    setContent(value);
    console.log('Content updated:', value);
  }, []);

  const insertText = (text, format = null) => {
    if (quill) {
      const currentLength = quill.getLength();
      quill.insertText(currentLength - 1, text); // Insert at the end of the current content
      if (format) {
        quill.formatText(currentLength - 1, text.length, format); // Apply formatting
      }
      quill.setSelection(currentLength + text.length - 1); // Move cursor to the end of the inserted text
    }
  };

  useEffect(() => {
    if (quill && selectedLogic) {
      insertText(selectedLogic); // Insert logic text without formatting
      onLogicInserted();
    }
  }, [quill, selectedLogic, onLogicInserted]);

  useEffect(() => {
    if (quill && selectedPlaceholder) {
      const placeholderText = `{{${selectedPlaceholder}}}`;
      insertText(placeholderText); // Insert placeholder text
      quill.formatText(quill.getLength() - placeholderText.length - 1, placeholderText.length, 'bold', true); // Apply bold formatting
      onPlaceholderInserted();
    }
  }, [quill, selectedPlaceholder, onPlaceholderInserted]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <ReactQuill
      value={content}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      theme="snow"
      style={{ height: '140px' }}
      ref={(el) => {
        if (el) {
          setQuill(el.getEditor());
        }
      }}
    />
  );
};

Editor.propTypes = {
  placeholder: PropTypes.string,
  selectedLogic: PropTypes.string,
  selectedPlaceholder: PropTypes.string,
  onLogicInserted: PropTypes.func,
  onPlaceholderInserted: PropTypes.func,
};
