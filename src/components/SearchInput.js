const SearchInput = ({ ...rest }) => {
  return (
    <div className="wrapper">
      <input {...rest} placeholder="Filter by name, region, or subregion" color="inherit" />

      <style jsx>{`
        .wrapper {
          display: flex;
          align-items: center;

          background-color: var(--background-color-dark);
          border-radius: 8px;
          padding-left: 16px;
          color: var(--text-color-secondary);
        }

        input {
          border: none;
          background-color: transparent;
          padding: 16px;
          width: 100%;
          height: 100%;
          outline: none;
          color: var(--text-color-secondary);
        }

        input::placeholder {
          color: var(--text-color-secondary);
        }
      `}</style>
    </div>
  )
}

export default SearchInput
