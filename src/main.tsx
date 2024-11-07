import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { Button } from "@/components/ui/button"
import * as React from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1 className="text-3xl font-bold underline text-primary">
      Hello world!
    </h1>
    <h1 className="text-3xl font-bold underline text-secondary">
      Hello world!
    </h1>
    <h1 className="text-3xl font-bold underline text-grey-100">
      Hello world!
    </h1>
    <h1 className="text-3xl font-bold underline text-grey-200">
      Hello world!
    </h1>
    <Button>Click me</Button>
  </StrictMode>
)
