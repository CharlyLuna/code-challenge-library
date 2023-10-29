import './Table.scss'

export const Table = ({ title, headings, children }) => {
  return (
    <div className='wrapper'>
      <h1>{title}</h1>
      <div className='table-container'>
        <table className='items-table'>
          <thead>
            <tr>
              {
                headings.map(heading => (
                  <th key={heading}>{heading}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}
