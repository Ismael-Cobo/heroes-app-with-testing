import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))


describe('SearchPage test', () => {

  test('debe de mostrarse correctamente con valores por defecto', () => {

    const { container } = render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Search a hero')).toBeTruthy()
    expect(screen.getByText('Searching')).toBeTruthy()
    expect(container).toMatchSnapshot()

  })

  test('debe de mostrarse a batman y el input con el valor del queryString', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    expect(screen.getAllByRole('article').length).toBe(1)
    expect(screen.getByAltText('Batman')).toBeTruthy()
    expect(screen.getByRole('textbox').value).toBe('batman')

    expect(screen.getByText('No hero with').style.display).toBe('none')

  })

  test('debe de mostrarse el error si no se encuentra un superheroe', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )

    expect(screen.queryByRole('article')).toBe(null)
    expect(screen.queryByAltText('Batman123')).toBeFalsy()
    expect(screen.getByRole('textbox').value).toBe('batman123')

    expect(screen.getByText('No hero with').style.display).toBe('')

  })

  test('la url debe de cambiar', () => {

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('form', { name: 'searchForm' })

    fireEvent.change(input, { target: { value: 'batman', name: 'searchText' } })
    fireEvent.submit(form)

    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman')
  })






})