"""empty message

Revision ID: 041103cf8b44
Revises: 0763d677d453
Create Date: 2025-05-08 03:16:19.153323

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '041103cf8b44'
down_revision = '0763d677d453'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('diary_entry',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=250), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('mood', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('content')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=500), nullable=False))
        batch_op.add_column(sa.Column('salt', sa.String(length=500), nullable=False))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), autoincrement=False, nullable=False))
        batch_op.drop_column('salt')
        batch_op.drop_column('password_hash')

    op.drop_table('diary_entry')
    # ### end Alembic commands ###
