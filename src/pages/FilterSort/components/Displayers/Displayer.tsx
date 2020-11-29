import Box from 'components/Box'
import ChoiceInput from 'components/forms/ChoiceInput'
import {
  SearchDisplayerBuilder,
  SearchDisplayerCriteria,
  UserUnitDisplayerTypeKeys,
} from '.'

export type DisplayerProps = {
  searchDisplayer?: SearchDisplayerCriteria
  onChange: (criteria?: SearchDisplayerCriteria) => void
}
export default function Displayer ({
  searchDisplayer,
  onChange,
}: DisplayerProps) {
  const OptionComponent =
    searchDisplayer && SearchDisplayerBuilder[searchDisplayer.type].input

  return (
    <Box display="flex" flexDirection="column" minHeight="50vh" alignContent="flex-start">
      <ChoiceInput
        type="radio"
        checked={!searchDisplayer}
        name="displayer-type"
        onChange={() => onChange(undefined)}
      >
        None
      </ChoiceInput>
      {UserUnitDisplayerTypeKeys.map(displayerType => (
        <ChoiceInput key={displayerType}
          type="radio"
          checked={searchDisplayer?.type === displayerType ?? false}
          name="displayer-type"
          onChange={() =>
            onChange({
              type: displayerType,
            })
          }
        >
          {SearchDisplayerBuilder[displayerType].label}
        </ChoiceInput>
      ))}
      {OptionComponent && searchDisplayer && (
        <OptionComponent
          options={searchDisplayer.options}
          onChange={options =>
            onChange({
              type: searchDisplayer.type,
              options,
            })
          }
        />
      )}
    </Box>
  )
}
