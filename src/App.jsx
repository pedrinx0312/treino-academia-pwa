import { useState, useEffect } from 'react'
import './App.css'

const workouts = {
  segunda: {
    title: 'Peito',
    subtitle: '15 séries • Força + Volume',
    color: '#3b82f6',
    exercises: [
      {
        name: 'Supino Reto Barra',
        sets: '4x',
        details: '30kg x10 / 36kg x8 / 40kg x6-8 / 32kg x10',
        rest: '90s',
        notes: 'Progressão: quando fizer 40kg x8, sobe pra 42kg'
      },
      {
        name: 'Supino Inclinado Halter',
        sets: '4x',
        details: '16kg x10 / 18kg x6-8 / 14kg x10 / 14kg x10',
        rest: '75s',
        notes: 'Progressão: 18kg x10 → sobe pra 20kg'
      },
      {
        name: 'Crucifixo Inclinado Halter',
        sets: '3x 12-15',
        details: '10-12kg',
        rest: '60s'
      },
      {
        name: 'Peck Deck ou Crossover',
        sets: '2x 12-15',
        details: '',
        rest: '60s'
      },
      {
        name: 'Flexão',
        sets: '2x até falhar',
        details: '',
        rest: '60s'
      }
    ]
  },
  terca: {
    title: 'Perna',
    subtitle: 'Força e Hipertrofia',
    color: '#60a5fa',
    exercises: [
      {
        name: 'Agachamento Livre',
        sets: '4x 8-10',
        details: '',
        rest: '90-120s'
      },
      {
        name: 'Cadeira Extensora',
        sets: '3x 12-15',
        details: '',
        rest: '60s'
      },
      {
        name: 'Cadeira Flexora',
        sets: '3x 12-15',
        details: '',
        rest: '60s'
      },
      {
        name: 'Stiff / RDL',
        sets: '3x 10-12',
        details: 'No lugar de adutora/abdutora',
        rest: '75s'
      },
      {
        name: 'Panturrilha em Pé',
        sets: '4x 15-20',
        details: '',
        rest: '45s'
      }
    ]
  },
  quarta: {
    title: 'Costas 1',
    subtitle: 'Pesado',
    color: '#2563eb',
    exercises: [
      {
        name: 'Puxada Frente Aberta',
        sets: '4x 8-10',
        details: '',
        rest: '90s'
      },
      {
        name: 'Remada Baixa Triângulo',
        sets: '4x 10-12',
        details: '',
        rest: '75s'
      },
      {
        name: 'Remada Curvada Barra',
        sets: '3x 8-10',
        details: '',
        rest: '90s'
      },
      {
        name: 'Rosca Direta',
        sets: '3x 10-12',
        details: 'Opcional',
        rest: '60s'
      }
    ]
  },
  quinta: {
    title: 'OFF TOTAL',
    subtitle: 'Descanso completo',
    color: '#93c5fd',
    exercises: [
      {
        name: 'Descanso Ativo (opcional)',
        sets: '',
        details: 'Se tiver muita energia: ombro lateral + desenvolvimento. O ideal é descansar para recuperar peito e costas.',
        rest: ''
      }
    ]
  },
  sexta: {
    title: 'Costas 2 + Abdômen',
    subtitle: 'Variação + Core',
    color: '#1d4ed8',
    exercises: [
      {
        name: 'Puxada Neutra Fechada Triângulo',
        sets: '4x 10-12',
        details: '',
        rest: '75s'
      },
      {
        name: 'Remada Unilateral Halter',
        sets: '3x 10 cada lado',
        details: '',
        rest: '60s'
      },
      {
        name: 'Pullover ou Peck Deck Invertido',
        sets: '3x 12-15',
        details: '',
        rest: '60s'
      },
      {
        name: 'Crunch Curtinho',
        sets: '3x 20',
        details: 'Abdômen',
        rest: '45s'
      },
      {
        name: 'Crunch na Polia com Corda (ajoelhado)',
        sets: '3x 15',
        details: 'Abdômen',
        rest: '45s'
      },
      {
        name: 'Prancha',
        sets: '3x 45s',
        details: 'Abdômen',
        rest: '45s'
      }
    ]
  }
}

const days = [
  { id: 'segunda', label: 'Seg', full: 'Segunda' },
  { id: 'terca', label: 'Ter', full: 'Terça' },
  { id: 'quarta', label: 'Qua', full: 'Quarta' 
