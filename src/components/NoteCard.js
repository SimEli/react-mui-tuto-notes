import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { makeStyles } from "@mui/styles";
import Avatar from '@mui/material/Avatar';
import { blue, green, pink, yellow } from '@mui/material/colors';

const useStyles = makeStyles({
	avatar: {
		backgroundColor: (note) => {
			if (note.category == 'work') {
				return yellow[700] + '!important' 
			}
			if (note.category == 'money') {
				return green[500] + '!important'
			}
			if (note.category == 'todos') {
				return pink[500] + '!important'
			}
			return blue[500] + '!important'
		}
	}
})

export default function NoteCard({ note, handleDelete }) {
	const classes = useStyles(note)

	return (
		<div>
			<Card elevation={1} className={classes.test}>
				<CardHeader
					avatar={
						<Avatar className={classes.avatar}>
							{note.category[0].toUpperCase()}
						</Avatar>
					}
					action={
						<IconButton onClick={(() => handleDelete(note.id))}>
							<DeleteOutlined />
						</IconButton>
        	}
					title={note.title}
					subheader={note.category}
				/>
				
				<CardContent>
					<Typography variant="body2" color="textSecondary">
						{note.details}
					</Typography>
				</CardContent>
			</Card>
		</div>
	)
}