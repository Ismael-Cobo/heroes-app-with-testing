import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"

import { AppRouter } from "../../src/router/AppRouter"
import { AuthContext } from "../../src/auth"

describe('AppRouter test', () => {

  test('debe de mostrar el login si no está autenticado', () => {

    const defaultContext = {
      logged: false
    }

    render(
      <AuthContext.Provider value={defaultContext}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByRole('button', { name: 'Login' }))

  })

  test('debe de mostrar el componente de marvel si está autenticado', () => {

    const defaultContext = {
      logged: true,
      user: { name: 'Ismael', id: '123' }
    }

    render(
      <AuthContext.Provider value={defaultContext}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Marvel'))
    expect(screen.getByText('Ismael'))
  })

})