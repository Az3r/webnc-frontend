import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'
import server from '@/mocks/server'

// setup mock server
beforeAll(() => server.listen())
afterAll(() => server.close())

afterEach(() => server.resetHandlers())
