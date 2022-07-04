import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PublicRoute } from "../../src/router/PublicRoute"

describe('PublicRoutes test', () => {



  test('debe de mostrar el children si no está autenticado', () => {

    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>No está autenticado</h1>
        </PublicRoute>
      </AuthContext.Provider>
    )

    expect(screen.getByText('No está autenticado')).toBeTruthy()

  })

  test('debe de poder navegar si está autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        name: 'Ismael',
        id: '1234'
      }
    }

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <Routes>
            <Route path="marvel" element={<h1>Marvel</h1>} />
            <Route path="login" element={
              <PublicRoute>
                <h1>No está autenticado</h1>
              </PublicRoute>
            } />
          </Routes>
        </AuthContext.Provider>

      </MemoryRouter>
    )

    expect(screen.getByText('Marvel')).toBeTruthy()

  })




})