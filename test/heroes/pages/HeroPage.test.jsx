import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { HeroPage } from "../../../src/heroes/pages"

describe('HeroPage test', () => {

  const mockedUseNavigate = jest.fn();
  const mockedUseParams = ({ id: 'marvel-spider' });

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
    useParams: () => mockedUseParams,
  }))

  test('debe de regresar los valores por defecto', () => {

    render(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Routes>
          <Route path="hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Spider Man')).toBeTruthy()
    expect(screen.getByText('Marvel Comics')).toBeTruthy()
    expect(screen.getAllByText('Peter Parker').length).toBeGreaterThanOrEqual(1)


  })

  // test('debe de volver a la anterior página', () => {

  //   render(
  //     <MemoryRouter initialEntries={['/hero/marvel-spider']}>
  //       <Routes>
  //         <Route path="hero/:id" element={<HeroPage />} />
  //       </Routes>
  //     </MemoryRouter>
  //   )

  //   const button = screen.getByRole('button', { name: 'regresar' })

  //   fireEvent.click(button)

  //   expect(mockedUseNavigate).toHaveBeenCalledWith(-1)
  // })

})

describe('HeroPage failed test', () => {

  const mockedUseNavigate = jest.fn();
  const mockedUseParams = ({ id: '1234' });

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
    useParams: () => mockedUseParams
  }))

  test('debe de redireccionar si el superheroe no existe', () => {

    render(
      <MemoryRouter initialEntries={['/hero/1234']}>
        <Routes>
          <Route path="hero/:id" element={<HeroPage />} />
          <Route path="/marvel" element={<h1>Heroe no encontrado</h1>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Heroe no encontrado')).toBeTruthy()
  })
})