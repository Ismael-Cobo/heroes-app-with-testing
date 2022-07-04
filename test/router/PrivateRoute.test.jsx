import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('PrivateRoute test', () => {


  test('debe de no poder navegar si no está autenticado', () => {

    const contextValue = {
      logged: false
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <Routes>
            <Route path="marvel" element={<PrivateRoute><h1>Marvel</h1></PrivateRoute>} />
            <Route path="login" element={<h1>No está autenticado</h1>} />
          </Routes>
        </AuthContext.Provider>

      </MemoryRouter>
    )

    expect(screen.getByText('No está autenticado')).toBeTruthy()

  })

  test('debe de poder navegar si está autenticado y guardar en el localstorage el último url visitado', () => {

    const contextValue = {
      logged: true,
      user: { name: 'Ismael', id: '123' }
    }

    Storage.prototype.setItem = jest.fn()

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <Routes>
            <Route path="marvel" element={<PrivateRoute><h1>Marvel</h1></PrivateRoute>} />
            <Route path="login" element={<h1>No está autenticado</h1>} />
          </Routes>
        </AuthContext.Provider>

      </MemoryRouter>
    )

    expect(screen.getByText('Marvel')).toBeTruthy()
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel')

  })

})