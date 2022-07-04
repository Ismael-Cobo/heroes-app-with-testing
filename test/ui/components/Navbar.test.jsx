import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { AuthContext } from "../../../src/auth/context/AuthContext"
import { Navbar } from "../../../src/ui/components/Navbar"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))


describe('Navbar test', () => {

  const contextValues = {
    user: {
      name: 'Ismael',
      id: '123'
    },
    logout: jest.fn(),
    logged: true
  }

  beforeEach(() => jest.clearAllMocks())
  test('debe de mostrar el nombre del usuario en el navbar', () => {



    render(
      <AuthContext.Provider value={contextValues}>
        <MemoryRouter initialEntries={['/']}>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Ismael')).toBeTruthy()

  })

  test('debe de hacer logout', () => {

    render(
      <AuthContext.Provider value={contextValues}>
        <MemoryRouter initialEntries={['/']}>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutButton = screen.getByRole('button', { name: 'logoutButton' })

    fireEvent.click(logoutButton)

    expect(contextValues.logout).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })


})