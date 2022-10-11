import React, { useEffect, useState } from 'react';

export default function Iframely(props) {
    const rawHTML = `
    <div>
      <p>The <strong>rat</strong> hates the <strong>cat</strong></p>
      <p><i>This is something special</i></p>
      <div>
        <img src="https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg"/>
      </div>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <h4>Just Another Heading</h4>
    </div>
    `;
    
    const App = () => {
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div>
        </div>
      );
    };
}