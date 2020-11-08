import Layout from '../../components/Layout'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const getCountry = async id => {
  return await (await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)).json()
}

const Country = ({ country }) => {
  const [borders, setBorders] = useState([])

  const getBorders = async () => {
    const result = await Promise.all(country.borders.map(border => getCountry(border)))
    setBorders(result)
  }

  useEffect(() => {
    getBorders()
  }, [country])

  return (
    <Layout title={country.name}>
      <div className="container">
        <div className="container-left">
          <div className="overview-panel">
            <img src={country.flag} alt={country.name} />
            <h1 className="overview-name">{country.name}</h1>
            <div className="overview-region">{country.region}</div>

            <div className="overview-numbers">
              <div className="overview-population">
                <div className="overview-value">{country.population}</div>
                <div className="overview-label">Population</div>
              </div>
              <div className="overview-area">
                <div className="overview-value">{country.area}</div>
                <div className="overview-label">Area</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-right">
          <div className="detail-panel">
            <h4 className="detail-heading">Details</h4>

            <div className="detail-panel-row">
              <div className="detail-panel-label">Capital</div>
              <div className="detail-panel-value">{country.capital}</div>
            </div>

            <div className="detail-panel-row">
              <div className="detail-panel-label">Subregion</div>
              <div className="detail-panel-value">{country.subregion}</div>
            </div>

            <div className="detail-panel-row">
              <div className="detail-panel-label">Languages</div>
              <div className="detail-panel-value">{country.languages.map(lang => lang.name).join(', ')}</div>
            </div>

            <div className="detail-panel-row">
              <div className="detail-panel-label">Currencies</div>
              <div className="detail-panel-value">{country.currencies.map(curr => curr.name).join(', ')}</div>
            </div>

            <div className="detail-panel-row">
              <div className="detail-panel-label">Native name</div>
              <div className="detail-panel-value">{country.nativeName}</div>
            </div>

            <div className="detail-panel-row">
              <div className="detail-panel-label">Gini</div>
              <div className="detail-panel-value">{country.gini} %</div>
            </div>

            <div className="detail-panel-borders">
              <div className="detail-panel-borders-label">Neighbouring Countries</div>
              <div className="detail-panel-borders-container">
                {borders.map(({ name, flag, alpha3Code }) => (
                  <Link href={`/country/${alpha3Code}`} key={flag}>
                    <a className="detail-panel-borders-country">
                      <img src={flag} alt={name} />
                      <div className="detail-panel-name">{name}</div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overview-panel img {
          width: 100%;
          border-radius: 4px;
        }

        .overview-panel {
          padding: 20px;
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          background-color: var(--background-color-light);
        }

        .overview-name {
          text-align: center;
          font-size: 32px;
          margin-bottom: 0;
        }

        .overview-region {
          text-align: center;
          font-size: 14px;
          font-weight: 300;
          margin-top: 4px;
          margin-bottom: 24px;
        }

        .overview-numbers {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          text-align: center;
        }

        .overview-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .detail-panel {
          background-color: var(--background-color-light);
          box-shadow: var(--box-shadow);
        }

        .detail-heading {
          padding: 20px;
          padding-bottom: 0;

          margin: 0;
        }

        .detail-panel-row {
          display: flex;
          justify-content: space-between;

          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
        }

        .detail-panel-label {
          color: var(--text-secondary);
        }

        .detail-panel-borders-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 24px;
        }

        .detail-panel-borders {
          padding: 20px;
        }

        .detail-panel-borders img {
          width: 100%;
          border-radius: 4px;
        }

        .detail-panel-borders-country {
          text-align: center;
        }

        .detail-panel-borders-label {
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .container {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
        }

        @media screen and (min-width: 720px) {
          .container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 24px;
          }

          .container-left {
            grid-column: 1 / span 4;
          }

          .container-right {
            grid-column: 5 / span 8;
          }
        }
      `}</style>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const countries = await (await fetch('https://restcountries.eu/rest/v2/all')).json()

  return {
    paths: countries.map(country => ({
      params: {
        id: country.alpha3Code
      }
    })),
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id)
  return {
    props: { country }
  }
}

export default Country
