import { useState } from 'react'
import CountryTable from '../components/CountryTable'
import Layout from '../components/Layout'
import SearchInput from '../components/SearchInput'

export default function Home({ countries }) {
  console.log(countries)
  const [keyword, setKeyword] = useState('')
  const filteredCountries = countries.filter(
    country =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  )

  const onSearch = e => {
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Layout>
      <div className="input-container">
        <div className="country-total">Found {filteredCountries.length} countries</div>
        <div className="input">
          <SearchInput onChange={onSearch} />
        </div>
      </div>

      <CountryTable countries={filteredCountries} />

      <style jsx>{`
        .country-total {
          margin: 12px 0;
          color: var(--text-color-secondary);
        }

        .input-container {
          margin-bottom: 40px;
        }

        @media screen and (min-width: 720px) {
          .input-container {
            display: flex;
            justify-content: space-between;
          }

          .country-total {
            flex: 1;
          }

          .input {
            flex: 2;
          }
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const countries = await (await fetch('https://restcountries.eu/rest/v2/all')).json()
  return {
    props: {
      countries
    }
  }
}
