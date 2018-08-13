import React from 'react'
import { Docs, Link } from 'docz'

const Menu = () => (
  <Docs>
    {({ docs }) => (
      <ul>
        {docs.map(doc => (
          <li key={doc.id}>
            <Link to={doc.route}>
              {doc.name}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </Docs>
)

export default Menu